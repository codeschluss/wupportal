import { Component, ContentChild, EventEmitter, HostBinding, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';
import { DrawerComponent as Compat } from './drawer.component.i';

@Component({
  selector: 'drawer-component',
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

export class DrawerComponent implements Compat, OnInit {

  @Output()
  public changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('attr.component')
  public readonly component: string = 'drawer';

  @ViewChild(MatDrawer, { static: true })
  public instance: MatDrawer;

  @ContentChild('drawerMain', { static: true })
  public main: TemplateRef<any>;

  @ContentChild('drawerMenu', { static: true })
  public menu: TemplateRef<any>;

  private state: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get visible(): Observable<boolean> {
    return this.state.asObservable();
  }

  public ngOnInit(): void {
    this.state.subscribe((state) => this.changed.emit(state));
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
