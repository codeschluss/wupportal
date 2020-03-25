import { HttpRequest } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router, RouterEvent, UrlSerializer } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { alert, ApplicationSettings, confirm, DeviceProvider, eachDescendant, getRootView, PushProvider } from '@wooportal/app';
import { CoreUrlSerializer, Headers, JwtClaims, LoadingProvider, SessionProvider, TokenProvider } from '@wooportal/core';
import { BehaviorSubject, EMPTY, fromEvent, Observable } from 'rxjs';
import { catchError, filter, map, mergeMap, startWith, tap } from 'rxjs/operators';
import { AndroidActivityBackPressedEventData as BackPressedEvent } from 'tns-core-modules/application';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { TextField } from 'tns-core-modules/ui/text-field';
import { LanguageModel } from '../../base/models/language.model';
import { LanguageProvider } from '../../base/providers/language.provider';
import { SubscriptionProvider } from '../../base/providers/subscription.provider';
import { DrawerComponent } from './drawer/drawer.component.i';

@Component({
  selector: 'shared-component',
  templateUrl: 'shared.component.html'
})

export class SharedComponent implements OnInit {

  public busy: BehaviorSubject<number>;

  public date: Date = new Date();

  public claims: JwtClaims;

  public language: FormControl = new FormControl();

  public languages: LanguageModel[] = [];

  @ViewChild('drawer', { static: true })
  private drawer: DrawerComponent;

  @ViewChild('header', { read: ElementRef, static: true })
  private header: ElementRef<HTMLElement>;

  @ViewChild('input', { read: ElementRef, static: false })
  private input: ElementRef<TextField>;

  private serializer: UrlSerializer = new CoreUrlSerializer();

  public get name(): Observable<string> {
    return this.headers.name;
  }

  public get pushable(): boolean {
    return this.pushProvider.enabled;
  }

  public get stores(): Record<string, string> {
    return {
      apple: 'https://apps.apple.com/app/id'
        + this.app.nativescript.appId,
      google: 'https://play.google.com/store/apps/details?id='
        + this.app.nativescript.id
    };
  }

  public get url(): string {
    return this.router.url;
  }

  public constructor(
    private app: ApplicationSettings,
    private changeDetection: ChangeDetectorRef,
    private deviceProvider: DeviceProvider,
    private headers: Headers,
    private i18n: I18n,
    private languageProvider: LanguageProvider,
    private loadingProvider: LoadingProvider,
    private route: ActivatedRoute,
    private router: Router,
    private pushProvider: PushProvider,
    private sessionProvider: SessionProvider,
    private subscriptionProvider: SubscriptionProvider,
    private tokenProvider: TokenProvider,
    private zone: NgZone
  ) { }

  public ngOnInit(): void {
    this.busy = new BehaviorSubject<number>(1);
    this.languageProvider.readAll().subscribe((l) => this.languages = l);
    this.language.setValue(this.sessionProvider.getLanguage());
    this.language.valueChanges.subscribe((language) => {
      setTimeout(() => this.deviceProvider.reload(), 250);
      this.sessionProvider.setLanguage(language);
    });

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => this.drawer.hide()),
      map((event) => event.url),
      startWith(this.router.url)
    ).subscribe((url) => this.transition(url));

    const params = this.route.snapshot.queryParamMap;
    if (params.has('embed') || params.has('native')) {
      this.deviceProvider.document.body.classList.add('embedded');
    }

    if (this.deviceProvider.platform === 'Native') {
      this.pushProvider.messages.subscribe((event) => {
        let route; switch (this.deviceProvider.notation) {
          case 'Android': route = event.data.route; break;
          case 'iOS': route = event.data.aps.route; break;
        }

        if (event.foreground && route) {
          confirm({
            cancelButtonText: this.i18n({ id: 'close', value: 'close' }),
            message: event.body,
            okButtonText: this.i18n({ id: 'details', value: 'details' }),
            title: event.title
          }).then((navigate) => {
            if (navigate) {
              this.zone.run(() => this.router.navigateByUrl(route));
            }
          });
        } else if (event.foreground) {
          alert({
            message: event.body,
            okButtonText: this.i18n({ id: 'close', value: 'close' }),
            title: event.title
          });
        } else if (route) {
          this.zone.run(() => this.router.navigateByUrl(route));
        }
      });
    }

    if (this.deviceProvider.notation !== 'Server') {
      this.loadingProvider.value.subscribe((l) => this.busy.next(l && 1));

      if (this.deviceProvider.notation === 'Browser') {
        const claims = this.app.config.jwtClaims;

        this.tokenProvider.value.pipe(
          map((tokens) => tokens.access),
          map((access) => Object.keys(claims).reduce((claim, key) =>
            Object.assign(claim, { [key]: access[claims[key]] }), { }))
        ).subscribe((claimed) => this.claims = claimed as JwtClaims);

        fromEvent(this.deviceProvider.document, 'scroll', {
          capture: true,
          passive: true
        }).pipe(
          filter((event) => (event as any).target instanceof HTMLElement),
          map((event) => (event as any).target as HTMLElement)
        ).subscribe((element) => this.topoff(element));
      } else if (this.deviceProvider.notation === 'Android') {
        fromEvent(this.deviceProvider.frontend, 'activityBackPressed').pipe(
          tap((event: BackPressedEvent) => event.cancel = true)
        ).subscribe(() => this.drawer.toggle());
      }
    }
  }

  public filter(url: string = this.router.url): string {
    return url.startsWith('/search')
      ? this.serializer.parse(url).root.children.primary.segments[1].path : '';
  }

  public navigate(...path: string[]): Promise<boolean> {
    const block = Object.create(HttpRequest);
    this.loadingProvider.enqueue(block);

    return new Promise((resolve) => {
      let timeout; switch (this.deviceProvider.notation) {
        case 'Android': timeout = 500; break;
        case 'Browser': timeout = 400; break;
        default: timeout = 0; break;
      }

      this.drawer.hide();
      setTimeout(resolve, timeout);
    }).then(() => this.router.navigate(path)).finally(() => setTimeout(() => {
      this.loadingProvider.finished(block);
      this.changeDetection.detectChanges();
    }));
  }

  public notifications(delay: boolean = false): void {
    const id = this.sessionProvider.getSubscriptionId();
    const navigate = (path: string[]) =>
      delay ? this.navigate(...path) : this.router.navigate(path);

    if (id) {
      navigate(['/', 'notifications', id]);
    } else {
      const block = Object.create(HttpRequest);
      this.loadingProvider.enqueue(block);
      this.pushProvider.registration().pipe(
        mergeMap((token) => this.subscriptionProvider.create({
          authSecret: token,
          locale: this.sessionProvider.getLanguage()
        })),
        catchError(() => EMPTY)
      ).subscribe((subscription) => {
        navigate(['/', 'notifications', subscription.id]);
        this.sessionProvider.setSubscriptionId(subscription.id);
    }).add(() => {
        this.loadingProvider.finished(block);
      });
    }
  }

  public toggle(state: boolean): void {
    if (!state && this.input) {
      this.input.nativeElement.dismissSoftInput();
    }
  }

  private topoff(element: HTMLElement): void {
    if (element.classList.contains('topoff')) {
      if (this.header.nativeElement.clientHeight) {
        if (element.scrollTop > this.header.nativeElement.clientHeight) {
          this.header.nativeElement.style.height = '0';
        }
      } else if (!element.scrollTop) {
        this.header.nativeElement.style.height = null;
      }
    }
  }

  private transition(url: string): void {
    const path = url.replace(/\?.*$/, '').slice(1).split('/')[0];

    if (this.deviceProvider.notation === 'Browser') {
      Array.from(this.deviceProvider.document.getElementsByClassName('topoff'))
        .forEach((element: HTMLElement) => element.scrollTo
          ? element.scrollTo({ behavior: 'smooth', top: 0 })
          : element.scrollTop = 0);
    } else if (this.deviceProvider.platform === 'Native') {
      eachDescendant(getRootView(), (element: ScrollView) =>
        element.cssClasses.has('topoff')
          ? element.scrollToVerticalOffset(0, true)
          : true);
    }

    switch (path) {
      case '':
        return this.headers.setTitle(null);

      case 'admin':
        return;

      case 'search':
        return this.headers.setTitle(
          this.i18n({ id: path, value: path }) + `: ${this.filter(url)}`
        );

      default:
        return this.headers.setTitle(this.i18n({ id: path, value: path }));
    }
  }

}
