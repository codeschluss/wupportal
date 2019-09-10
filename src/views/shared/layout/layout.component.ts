import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, TRANSLATIONS, TRANSLATIONS_FORMAT, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterEvent, UrlSerializer } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { I18nResolver, JwtClaims, LoadingProvider, PlatformProvider, SessionProvider, Title, TokenProvider, TRANSLATIONS_FACTORY } from '@wooportal/core';
import { CoreUrlSerializer } from '@wooportal/core/utils/serializer';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { AndroidActivityBackPressedEventData } from 'tns-core-modules/application';
import { LanguageModel } from '../../../realm/models/language.model';
import { LanguageProvider } from '../../../realm/providers/language.provider';
import { ClientPackage } from '../../../utils/package';
import { DrawerCompat } from '../compat/drawer/drawer.compat.i';

@Component({
  providers: [
    I18n,
    {
      deps: [I18nResolver],
      provide: TRANSLATIONS,
      useFactory: TRANSLATIONS_FACTORY
    },
    {
      provide: TRANSLATIONS_FORMAT,
      useValue: 'xliff'
    }
  ],
  selector: 'layout-component',
  templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit {

  public busy: BehaviorSubject<number>;

  public date: Date = new Date();

  public claimed: JwtClaims;

  public language: string;

  public languages: LanguageModel[] = [];

  public navigate: (...path: string[]) => Promise<boolean>;

  public search: (filter: string) => Promise<any>;

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
    @Inject(DOCUMENT) private document: Document,
    private element: ElementRef<HTMLElement>,
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
    this.navigate = (...path: string[]) => this.router.navigate(path);
    this.search = (input: string) => this.navigate('/', 'search', input)
      .then(() => setTimeout(() => this.drawer.hide(), 0));

    this.languageProvider.readAll().subscribe((l) => this.languages = l);
    this.sessionProvider.value.subscribe((s) => this.language = s.language);

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => this.drawer.hide()),
      map((event) => event.url),
      startWith(this.router.url)
    ).subscribe((url) => this.navigating(url));

    if (this.route.snapshot.queryParams.embed) {
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
        fromEvent(this.platformProvider.engine, 'activityBackPressed')
          .subscribe((event: AndroidActivityBackPressedEventData) => {
            event.cancel = true;
            this.drawer.toggle();
          });
      }
    }
  }

  public filter(url: string = this.router.url): string {
    return url.startsWith('/search')
      ? this.serializer.parse(url).root.children.primary.segments[1].path
      : '';
  }

  public translate(language: string): void {
    this.sessionProvider.changeLanguage(language);
    this.element.nativeElement.classList.add('fadeout');
    setTimeout(() => this.document.location.reload(), 250);
  }

  private navigating(url: string): void {
    let title = null;
    const path = url.replace(/\?.*$/, '').slice(1).split('/');

    switch (path[0]) {
      case 'admin':
        title = null;
        break;
      case 'search':
        title = this.i18n({ id: path[0], value: path[0] });
        title += `: ${this.filter(url)}`;
        break;
      default:
        title = this.i18n({ id: path[0], value: path[0] });
        break;
    }

    if (title) {
      this.titleService.set(title);
    }

    if (this.platformProvider.name === 'Web') {
      const topoff = this.document.getElementsByClassName('topoff');
      Array.from(topoff).forEach((element) => element.scrollTo({
        behavior: 'smooth',
        top: 0
      }));
    }
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

}
