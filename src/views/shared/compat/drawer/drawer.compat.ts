import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';
import { DrawerCompat as Compat } from './drawer.compat.d';

@Component({
  selector: 'drawer-compat',
  template: `
    <mat-drawer-container>
      <mat-drawer-content>
        <router-outlet></router-outlet>
      </mat-drawer-content>
      <mat-drawer
        mode="push"
        (closedStart)="stateListener(false)"
        (openedStart)="stateListener(true)">
        <ng-content></ng-content>
      </mat-drawer>
    </mat-drawer-container>
  `
})

export class DrawerCompat implements Compat {

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
