import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { PlatformProvider } from '@wooportal/core';
import { CoreUrlSerializer } from '@wooportal/core/utils/serializer';
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

  public get url(): string {
    return this.router.url;
  }

  public constructor(
    private router: Router,
    platformProvider: PlatformProvider
  ) {
    if (platformProvider.name === 'Web') {
      addEventListener('scroll', this.topoff.bind(this), true);
    }
  }

  public navigate(...path: string[]): void {
    this.router.navigate(path);
    this.drawer.hide();
  }

  private topoff(event: UIEvent): void {
    const height = this.header.nativeElement.clientHeight;
    const scroll = (event.target as HTMLElement).scrollTop;

    if (height) {
      if (scroll > height) {
        this.header.nativeElement.style.height = '0px';
      }
    } else if (!scroll) {
      this.header.nativeElement.style.height = null;
    }
  }

}
