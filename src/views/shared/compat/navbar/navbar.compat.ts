import { Component, Input } from '@angular/core';
import { NavbarCompat } from './navbar.compat.i';

@Component({
  selector: 'navbar-compat',
  template: `
    <mat-toolbar>
      <ng-container *ngIf="title">
        <h1>{{ title }}</h1>
      </ng-container>
      <ng-content></ng-content>
    </mat-toolbar>
  `
})

export class NavbarCompatComponent implements NavbarCompat {

  @Input()
  public title: string;

}
