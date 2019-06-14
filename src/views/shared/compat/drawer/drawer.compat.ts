import { Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'drawer-compat',
  template: `
    <mat-drawer-container>
      <mat-drawer-content>
        <ng-container *ngTemplateOutlet="main"></ng-container>
      </mat-drawer-content>
      <mat-drawer
        mode="push"
        (closedStart)="stateListener(false)"
        (openedStart)="stateListener(true)">
        <ng-container *ngTemplateOutlet="menu"></ng-container>
      </mat-drawer>
    </mat-drawer-container>
  `
})

export class DrawerCompat {

  @ContentChild('main', { static: true })
  public main: TemplateRef<any>;

  @ContentChild('menu', { static: true })
  public menu: TemplateRef<any>;

  @ViewChild(MatDrawer, { static: true })
  public instance: MatDrawer;

  private state: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get visible(): Observable<boolean> {
    return this.state.asObservable();
  }

  public stateListener(state: boolean): void {
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
