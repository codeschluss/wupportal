import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, UrlSerializer } from '@angular/router';
import { JwtClaims, LoadingProvider, PlatformProvider, SessionProvider, TokenProvider } from '@wooportal/core';
import { CoreUrlSerializer } from '@wooportal/core/utils/serializer';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AndroidActivityBackPressedEventData } from 'tns-core-modules/application';
import { LanguageModel } from '../../../realm/models/language.model';
import { LanguageProvider } from '../../../realm/providers/language.provider';
import { ClientPackage } from '../../../utils/package';
import { DrawerCompat } from '../compat/drawer/drawer.compat.i';

@Component({
  selector: 'layout-component',
  templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit {

  public busy: BehaviorSubject<number>;

  public claimed: JwtClaims;

  public language: string;

  public languages: LanguageModel[] = [];

  public navigate: (...path: string[]) => Promise<boolean>;

  @ViewChild('drawer', { static: true })
  private drawer: DrawerCompat;

  @ViewChild('header', { read: ElementRef, static: true })
  private header: ElementRef<HTMLElement>;

  private serializer: UrlSerializer = new CoreUrlSerializer();

  public get query(): string {
    const tree = this.serializer.parse(this.router.url);

    return this.router.url.startsWith('/search')
      ? tree.root.children.primary.segments[1].path
      : '';
  }

  public get title(): string {
    return ClientPackage.config.defaults.title;
  }

  public get url(): string {
    return this.router.url;
  }

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private languageProvider: LanguageProvider,
    private loadingProvider: LoadingProvider,
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute,
    private router: Router,
    private sessionProvider: SessionProvider,
    private tokenProvider: TokenProvider
  ) { }

  public ngOnInit(): void {
    this.busy = new BehaviorSubject<number>(1);
    this.languageProvider.readAll().subscribe((l) => this.languages = l);
    this.navigate = (...path: string[]) => this.router.navigate(path);
    this.sessionProvider.value.subscribe((s) => this.language = s.language);

    this.router.events.pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => this.drawer.hide());

    if ('embed' in this.route.snapshot.queryParams) {
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

  public translate(language: string): void {
    this.sessionProvider.changeLanguage(language);

    // TODO: reinitialize w/ new xliff
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
