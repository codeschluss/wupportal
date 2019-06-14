import { Component, ViewChild } from '@angular/core';
import { Title } from '@wooportal/core';
import { Observable } from 'rxjs';
import { DrawerCompat } from '../compat/drawer/drawer.compat';

@Component({
  styleUrls: ['layout.component.scss'],
  templateUrl: 'layout.component.html'
})

export class LayoutComponent {

  @ViewChild('drawer', { static: true })
  public drawer: DrawerCompat;

  public title: Observable<string>;

  public constructor(
    titleService: Title
  ) {
    this.title = titleService.value;
  }

  public toggleDrawer(): void {
    this.drawer.toggle();
  }

}
