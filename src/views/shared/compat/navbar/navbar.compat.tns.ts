import { Component, HostBinding, Input } from '@angular/core';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { ContentView } from 'tns-core-modules/ui/page';
import { NavbarCompat } from './navbar.compat.i';

if (!isKnownView('navbar-compat')) {
  registerElement('navbar-compat', () => ContentView);
}

@Component({
  selector: 'navbar-compat',
  template: `
    <ActionBar [title]="title"><ng-content></ng-content></ActionBar>
  `
})

export class NavbarCompatComponent implements NavbarCompat {

  @HostBinding('attr.compat')
  public readonly compat: string = 'navbar';

  @Input()
  public title: string;

}
