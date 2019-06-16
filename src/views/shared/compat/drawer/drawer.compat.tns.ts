import { Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContentView } from 'tns-core-modules/ui/page/page';
import { DrawerCompat as Compat } from './drawer.compat.d';

if (!isKnownView('drawer-compat')) {
  registerElement('drawer-compat', () => ContentView);
}

@Component({
  selector: 'drawer-compat',
  template: `
    <RadSideDrawer
      tkToggleNavButton
      drawerTransition="PushTransition"
      (drawerClosing)="stateListener(false)"
      (drawerOpening)="stateListener(true)">
      <GridLayout tkMainContent>
        <ng-container *ngTemplateOutlet="main"></ng-container>
      </GridLayout>
      <GridLayout tkDrawerContent>
        <ng-container *ngTemplateOutlet="menu"></ng-container>
      </GridLayout>
    </RadSideDrawer>
  `
})

export class DrawerCompat extends ContentView implements Compat {

  @ContentChild('main', { static: true })
  public main: TemplateRef<any>;

  @ContentChild('menu', { static: true })
  public menu: TemplateRef<any>;

  @ViewChild(RadSideDrawerComponent, { static: true })
  public instance: RadSideDrawerComponent;

  private state: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get visible(): Observable<boolean> {
    return this.state.asObservable();
  }

  public stateListener(state: boolean): void {
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
DrawerCompat
}
