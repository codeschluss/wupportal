import { HttpRequest } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationStart, Router, RouterEvent, UrlSerializer } from '@angular/router';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { debounceTime, filter, map, startWith, take, tap } from 'rxjs/operators';
import { CoreSettings, JwtClaims, LabelResolver, LanguageModel, LanguageProvider, LoadingProvider, MetatagService, PlatformProvider, SessionProvider, TokenProvider } from '../../core';
import { ClientUrlSerializer } from '../../tools/serializer';
import { NotificationPopupComponent } from '../public/popups/notification/notification.popup';

@Component({
  selector: 'shared-component',
  templateUrl: 'shared.component.html'
})

export class SharedComponent
  implements OnInit {

  public busy: BehaviorSubject<number>;

  public date: Date = new Date();

  public claims: JwtClaims;

  public language: FormControl = new FormControl();

  public languages: LanguageModel[] = [];

  @ViewChild(MatDrawer, { static: true })
  private drawer: MatDrawer;

  @ViewChild('header', { read: ElementRef, static: true })
  private header: ElementRef<HTMLElement>;

  private serializer: UrlSerializer = new ClientUrlSerializer();

  public get name(): Observable<string> {
    return this.metatagService.name.pipe(startWith(''));
  }

  public get platform(): string {
    return this.platformProvider.name;
  }

  public get stores(): Record<string, string> {
    return {
      apple: 'https://apps.apple.com/app/id'
        + this.settings.storeIds.ios,
      google: 'https://play.google.com/store/apps/details?id='
        + this.settings.storeIds.android
    };
  }

  public get subscriptionId(): string {
    return this.sessionProvider.getSubscriptionId() || 'register';
  }

  public get url(): string {
    return this.router.url;
  }

  private get fcm(): CordovaPluginFirebaseMessaging {
    return cordova.plugins.firebase.messaging;
  }

  public constructor(
    private changeDetection: ChangeDetectorRef,
    private dialog: MatDialog,
    private labelResolver: LabelResolver,
    private languageProvider: LanguageProvider,
    private loadingProvider: LoadingProvider,
    private ngZone: NgZone,
    private metatagService: MetatagService,
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute,
    private router: Router,
    private sessionProvider: SessionProvider,
    private settings: CoreSettings,
    private tokenProvider: TokenProvider
  ) { }

  public ngOnInit(): void {
    this.busy = new BehaviorSubject<number>(1);
    this.languageProvider.readAll().subscribe((l) => this.languages = l);
    this.language.setValue(this.sessionProvider.getLanguage());
    this.language.valueChanges.subscribe((language) => {
      setTimeout(() => this.platformProvider.reload(), 500);
      this.sessionProvider.setLanguage(language);
    });

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => this.drawer.close()),
      map((event) => event.url),
      startWith(this.router.url)
    ).subscribe((url) => this.transition(url));

    if (this.route.snapshot.queryParamMap.has('embed')) {
      this.platformProvider.document.body.classList.add('embedded');
    }

    if (this.platformProvider.name !== 'server') {
      const claims = this.settings.jwtClaims;
      this.loadingProvider.value.subscribe((l) => this.busy.next(l && 1));

      this.tokenProvider.value.pipe(
        map((tokens) => tokens.access),
        map((access) => Object.keys(claims).reduce((claim, key) =>
          Object.assign(claim, { [key]: access[claims[key]] }), { }))
      ).subscribe((claimed) => this.claims = claimed as JwtClaims);

      fromEvent(this.platformProvider.document, 'scroll', {
        capture: true,
        passive: true
      }).pipe(
        filter((event) => (event as any).target instanceof HTMLElement),
        map((event) => (event as any).target as HTMLElement),
        filter((element) => element.classList.contains('topoff'))
      ).subscribe((element) => {
        if (this.header.nativeElement.clientHeight) {
          if (element.scrollTop > this.header.nativeElement.clientHeight) {
            this.header.nativeElement.style.height = '0';
          }
        } else if (!element.scrollTop) {
          this.header.nativeElement.style.height = null;
        }
      });

      if (['android', 'ios'].includes(this.platformProvider.name)) {
        this.busy.pipe(
          debounceTime(500),
          filter((count) => count === 0),
          take(1)
        ).subscribe(() => {
          this.platformProvider.navigator.splashscreen?.hide();
        });

        this.sessionProvider.value.pipe(
          map((session) => session.subscriptionId),
          filter((id) => id.length > 0 && id !== 'blocked'),
          take(1)
        ).subscribe(() => {
          this.fcm.onMessage((event) => this.ngZone.run(() => {
            this.dialog.open(NotificationPopupComponent, {
              data: event
            }).afterClosed().pipe(filter(Boolean)).subscribe((route) => {
              this.router.navigateByUrl(route as string);
            });
          }), console.error);

          this.fcm.onBackgroundMessage((event) => this.ngZone.run(() => {
            switch (true) {
              case this.platformProvider.name === 'android' && 'route' in event:
                this.router.navigateByUrl(event.route);
                break;

              case this.platformProvider.name === 'ios' && 'route' in event.aps:
                this.router.navigateByUrl(event.aps.route);
                break;
            }
          }), console.error);
        });
      }
    }
  }

  public filter(url: string = this.router.url): string {
    if (url.startsWith('/search')) {
      return this.serializer.parse(url).root.children.primary.segments[1].path;
    }

    return '';
  }

  public navigate(...path: string[]): Promise<boolean> {
    const block = Object.create(HttpRequest);
    this.loadingProvider.enqueue(block);

    return new Promise((resolve) => {
      this.drawer.close();
      setTimeout(resolve, this.platformProvider.name === 'server' ? 0 : 400);
    }).then(() => this.router.navigate(path)).finally(() => setTimeout(() => {
      this.loadingProvider.finished(block);
      this.changeDetection.detectChanges();
    }));
  }

  private transition(url: string): void {
    let path = url.replace(/\?.*$/, '').slice(1).split('/')[0];

    if (this.platformProvider.name !== 'server') {
      Array.from(
        this.platformProvider.document.getElementsByClassName('topoff')
      ).forEach((element: HTMLElement) => {
        if (typeof element.scrollTo === 'function') {
          element.scrollTo({ behavior: 'smooth', top: 0 });
        } else {
          element.scrollTop = 0;
        }
      });
    }

    switch (path) {
      case '':
        return this.metatagService.setTitle(null);

      case 'admin':
        return;

      case 'search':
        path = this.labelResolver.lookup(path);
        return this.metatagService.setTitle(`${path}: ${this.filter(url)}`);

      default:
        path = this.labelResolver.lookup(path);
        return this.metatagService.setTitle(path);
    }
  }

}
