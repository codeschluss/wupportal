import { Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContentView } from 'tns-core-modules/ui/page';
import { DrawerCompat } from './drawer.compat.i';

@Component({
  selector: 'drawer-compat',
  template: `
    <RadSideDrawer tkToggleNavButton
      drawerTransition="PushTransition"
      (drawerClosing)="drawn(false)"
      (drawerOpening)="drawn(true)">
      <GridLayout tkMainContent>
        <ng-container *ngTemplateOutlet="main"></ng-container>
      </GridLayout>
      <GridLayout tkDrawerContent>
        <ng-container *ngTemplateOutlet="menu"></ng-container>
      </GridLayout>
    </RadSideDrawer>
  `
})

export class DrawerCompatComponent extends ContentView implements DrawerCompat {

  @ViewChild(RadSideDrawerComponent, { static: true })
  public instance: RadSideDrawerComponent;

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
    this.instance.sideDrawer.closeDrawer();
  }

  public show(): void {
    this.instance.sideDrawer.showDrawer();
  }

  public toggle(): void {
    this.instance.sideDrawer.toggleDrawerState();
  }

}
