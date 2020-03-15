import { Component, HostBinding, Input } from '@angular/core';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { ContentView } from 'tns-core-modules/ui/content-view';
import { NavbarComponent as Compat } from './navbar.component.i';

if (!isKnownView('navbar-component')) {
  registerElement('navbar-component', () => ContentView);
}

@Component({
  selector: 'navbar-component',
  styles: [`
    Label {
      font-size: 20;
      font-weight: 500;
      horizontal-align: left;
      text-align: left;
      width: 100%;
    }
  `],
  template: `
    <ActionBar>
      <Label [text]="title"></Label>
      <ng-content></ng-content>
    </ActionBar>
  `
})

export class NavbarComponent implements Compat {

  @HostBinding('attr.component')
  public readonly component: string = 'navbar';

  @Input()
  public title: string;

}
