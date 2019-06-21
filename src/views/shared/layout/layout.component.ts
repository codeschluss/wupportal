import { Component, ViewChild } from '@angular/core';
import { ClientManifest } from '../../../utils/manifest';
import { DrawerCompat } from '../compat/drawer/drawer.compat.i';

@Component({
  selector: 'layout-component',
  templateUrl: 'layout.component.html'
})

export class LayoutComponent {

  @ViewChild('drawer', { static: true })
  public drawer: DrawerCompat;

  public title: string = ClientManifest.shortTitle;

  public search(query: string): void {
    console.log(query);
    this.drawer.hide();
  }

  public toggleDrawer(): void {
    this.drawer.toggle();
  }

}
