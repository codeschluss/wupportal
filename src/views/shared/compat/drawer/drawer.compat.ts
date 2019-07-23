import { Component, ContentChild, HostBinding, TemplateRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';
import { DrawerCompat } from './drawer.compat.i';

@Component({
  selector: 'drawer-compat',
  template: `
    <mat-drawer-container>
      <mat-drawer-content class="topoff">
        <ng-container *ngTemplateOutlet="main"></ng-container>
      </mat-drawer-content>
      <mat-drawer
        mode="push"
        (closedStart)="drawn(false)"
        (openedStart)="drawn(true)">
        <ng-container *ngTemplateOutlet="menu"></ng-container>
      </mat-drawer>
    </mat-drawer-container>
  `
})

export class DrawerCompatComponent implements DrawerCompat {

  @HostBinding('attr.compat')
  public readonly compat: string = 'drawer';

  @ViewChild(MatDrawer, { static: true })
  public instance: MatDrawer;

  @ContentChild('drawerMain', { static: true })
  public main: TemplateRef<any>;

  @ContentChild('drawerMenu', { static: true })
  public menu: TemplateRef<any>;

  private state: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get visible(): Observable<boolean> {
    return this.state.asObservable();
  }

  public drawn(state: boolean): void {
    this.state.next(state);
  }

  public hide(): void {
    this.instance.close();
  }

  public show(): void {
    this.instance.open();
  }

  public toggle(): void {
    this.instance.toggle();
  }

}
