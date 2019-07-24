import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, UrlSerializer } from '@angular/router';
import { LoadingProvider, PlatformProvider } from '@wooportal/core';
import { CoreUrlSerializer } from '@wooportal/core/utils/serializer';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AndroidActivityBackPressedEventData } from 'tns-core-modules/application';
import { ClientPackage } from '../../../utils/package';
import { DrawerCompat } from '../compat/drawer/drawer.compat.i';

@Component({
  selector: 'layout-component',
  templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit {

  public busy: 0 | 1 = 1;

  public navigate: Function;

  public title: string = ClientPackage.config.defaults.title;

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

  public get url(): string {
    return this.router.url;
  }

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private loadingProvider: LoadingProvider,
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.navigate = (...path: string[]) => this.router.navigate(path);

    this.router.events.pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => this.drawer.hide());

    if ('embed' in this.route.snapshot.queryParams) {
      this.document.body.classList.add('embedded');
    }

    if (this.platformProvider.name !== 'Server') {
      this.loadingProvider.value.subscribe((loads) => this.busy = loads && 1);

      if (this.platformProvider.name === 'Web') {
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
