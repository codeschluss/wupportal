import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationStart, Router, UrlSerializer } from '@angular/router';
import { PlatformProvider } from '@wooportal/core';
import { CoreUrlSerializer } from '@wooportal/core/utils/serializer';
import { filter } from 'rxjs/operators';
import { ClientManifest } from '../../../utils/manifest';
import { DrawerCompat } from '../compat/drawer/drawer.compat.i';

@Component({
  selector: 'layout-component',
  templateUrl: 'layout.component.html'
})

export class LayoutComponent {

  public title: string = ClientManifest.shortTitle;

  @ViewChild('drawer', { static: true })
  private drawer: DrawerCompat;

  @ViewChild('header', { static: true })
  private header: ElementRef<HTMLElement>;

  private serializer: UrlSerializer = new CoreUrlSerializer();

  public get query(): string {
    const tree = this.serializer.parse(this.router.url);

    return this.router.url.startsWith('/search')
      ? tree.root.children.primary.segments[1].path
      : '';
  }

  public constructor(
    public router: Router,
    platformProvider: PlatformProvider
  ) {
    switch (platformProvider.name) {
      case 'Web':
        addEventListener('scroll', this.topoff.bind(this), true);

      // tslint:disable-next-line: no-switch-case-fall-through
      case 'Android':
      case 'iOS':
      case 'Web':
        this.router.events.pipe(
          filter((event) => event instanceof NavigationStart)
        ).subscribe(() => this.drawer.hide());
    }
  }

  private topoff(event: UIEvent): void {
    const height = this.header.nativeElement.clientHeight;
    const scroll = (event.target as HTMLElement).scrollTop;

    if (height) {
      if (scroll > height) {
        this.header.nativeElement.style.maxHeight = '0px';
      }
    } else if (!scroll) {
      this.header.nativeElement.style.maxHeight = null;
    }
  }

}
