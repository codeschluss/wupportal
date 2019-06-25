import { Component, Input } from '@angular/core';
import { NavbarCompat } from './navbar.compat.i';

@Component({
  selector: 'navbar-compat',
  template: `
    <ActionBar [title]="title"><ng-content></ng-content></ActionBar>
  `
})

export class NavbarCompatComponent implements NavbarCompat {

  @Input()
  public title: string;

}
