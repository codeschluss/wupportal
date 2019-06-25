import { Component, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PlatformProvider } from '@wooportal/core';
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

  public constructor(
    public router: Router,
    platformProvider: PlatformProvider
  ) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe(() => {
      switch (platformProvider.type) {
        case 'Native': setTimeout(() => this.drawer.hide(), 150); break;
        case 'Online': setTimeout(() => this.drawer.hide(), 50); break;
      }
    });
  }

  public search(query: string): void {
    if (query) {
      console.log(`query: ${query}`);
      this.drawer.hide();
    }
  }

}
