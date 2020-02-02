import { Component, HostBinding, Input } from '@angular/core';
import { NavbarComponent as Compat } from './navbar.component.i';

@Component({
  selector: 'navbar-component',
  template: `
    <mat-toolbar>
      <ng-container *ngIf="title">
        <h1>{{ title }}</h1>
      </ng-container>
      <ng-content></ng-content>
    </mat-toolbar>
  `
})

export class NavbarComponent implements Compat {

  @HostBinding('attr.component')
  public readonly component: string = 'navbar';

  @Input()
  public title: string;

}
