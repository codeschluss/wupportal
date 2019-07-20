import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { NavigationStart, Router, UrlSerializer } from '@angular/router';
import { LoadingProvider, PlatformProvider } from '@wooportal/core';
import { CoreUrlSerializer } from '@wooportal/core/utils/serializer';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClientManifest } from '../../../utils/manifest';
import { DrawerCompat } from '../compat/drawer/drawer.compat.i';

@Component({
  selector: 'layout-component',
  templateUrl: 'layout.component.html'
})

export class LayoutComponent {

  public busy: 0 | 1 = 1;

  public title: string = ClientManifest.shortTitle;

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
    private router: Router,
    @Inject(DOCUMENT) document: Document,
    loadingProvider: LoadingProvider,
    platformProvider: PlatformProvider
  ) {
    router.events.pipe(filter((event) => event instanceof NavigationStart))
    .subscribe(() => this.drawer.hide());

    if (platformProvider.name === 'Web') {
      loadingProvider.value.subscribe((loading) => this.busy = loading && 1);

      fromEvent(document, 'scroll', { capture: true, passive: true })
        .subscribe((event) => this.topoff(event));
    }
  }

  // TODO: drop from this.tns.html
  public navigate(...path: string[]): void {
    this.router.navigate(path);
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
