import { DOCUMENT } from '@angular/common';
import { HttpRequest } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router, RouterEvent, UrlSerializer } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { JwtClaims, LoadingProvider, PlatformProvider, SessionProvider, Title, TokenProvider } from '@wooportal/core';
import { CoreUrlSerializer } from '@wooportal/core/utils/serializer';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { AndroidActivityBackPressedEventData as BackPressedEvent } from 'tns-core-modules/application';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { LanguageModel } from '../../../realm/models/language.model';
import { LanguageProvider } from '../../../realm/providers/language.provider';
import { ClientPackage } from '../../../utils/package';
import { DrawerCompat } from '../compat/drawer/drawer.compat.i';
import { eachDescendant, getRootView } from '../shared.imports';

@Component({
  selector: 'layout-component',
  templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit {

  public busy: BehaviorSubject<number>;

  public date: Date = new Date();

  public claimed: JwtClaims;

  public language: FormControl = new FormControl();

  public languages: LanguageModel[] = [];

  @ViewChild('drawer', { static: true })
  private drawer: DrawerCompat;

  @ViewChild('header', { read: ElementRef, static: true })
  private header: ElementRef<HTMLElement>;

  private serializer: UrlSerializer = new CoreUrlSerializer();

  public get name(): Observable<string> {
    return this.titleService.name;
  }

  public get url(): string {
    return this.router.url;
  }

  public constructor(
    private changeDetection: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private i18n: I18n,
    private languageProvider: LanguageProvider,
    private loadingProvider: LoadingProvider,
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute,
    private router: Router,
    private sessionProvider: SessionProvider,
    private titleService: Title,
    private tokenProvider: TokenProvider
  ) { }

  public ngOnInit(): void {
    this.busy = new BehaviorSubject<number>(1);
    this.languageProvider.readAll().subscribe((l) => this.languages = l);
    this.language.setValue(this.sessionProvider.getLanguage());
    this.language.valueChanges.subscribe((language) => {
      setTimeout(() => this.platformProvider.reload(), 250);
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
      this.document.body.classList.add('embedded');
    }

    if (this.platformProvider.name !== 'Server') {
      this.loadingProvider.value.subscribe((l) => this.busy.next(l && 1));

      if (this.platformProvider.name === 'Web') {
        const claims = ClientPackage.config.jwtClaims;

        this.tokenProvider.value.pipe(
          map((tokens) => tokens.access),
          map((access) => Object.keys(claims).reduce((claim, key) =>
            Object.assign(claim, { [key]: access[claims[key]] }), { }))
        ).subscribe((claimed) => this.claimed = claimed as JwtClaims);

        fromEvent(this.document, 'scroll', { capture: true, passive: true })
          .subscribe((event) => this.topoff(event));
      } else if (this.platformProvider.name === 'Android') {
        fromEvent(this.platformProvider.engine, 'activityBackPressed').pipe(
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
      this.drawer.hide();
      setTimeout(resolve, (() => {
        switch (this.platformProvider.name) {
          case 'Android': return 500;
          case 'Web': return 400;
          default: return 0;
        }
      })());
    }).then(() => this.router.navigate(path)).finally(() => setTimeout(() => {
      this.loadingProvider.finished(block);
      this.changeDetection.detectChanges();
    }));
  }

  private topoff(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('topoff')) {
      const height = this.header.nativeElement.clientHeight;
      const scroll = (event.target as HTMLElement).scrollTop;

      if (height) {
        if (scroll > height) {
          this.header.nativeElement.style.height = '0';
        }
      } else if (!scroll) {
        this.header.nativeElement.style.height = null;
      }
    }
  }

  private transition(url: string): void {
    const path = url.replace(/\?.*$/, '').slice(1).split('/')[0];

    if (this.platformProvider.name === 'Web') {
      Array.from(this.document.getElementsByClassName('topoff'))
        .forEach((element: HTMLElement) => element.scrollTo
          ? element.scrollTo({ behavior: 'smooth', top: 0 })
          : element.scrollTop = 0);
    } else if (this.platformProvider.type === 'Native') {
      eachDescendant(getRootView(), (element: ScrollView) =>
        element.cssClasses.has('topoff')
          ? element.scrollToVerticalOffset(0, true)
          : true);
    }

    switch (path) {
      case '':
        return this.titleService.set(null);

      case 'admin':
        return;

      case 'search':
        return this.titleService.set(
          this.i18n({ id: path, value: path }) + `: ${this.filter(url)}`
        );

      default:
        return this.titleService.set(this.i18n({ id: path, value: path }));
    }
  }

}
