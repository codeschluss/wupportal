import { Component, ContentChild, EventEmitter, HostBinding, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContentView } from 'tns-core-modules/ui/page';
import { DrawerComponent as Compat } from './drawer.component.i';

if (!isKnownView('drawer-component')) {
  registerElement('drawer-component', () => ContentView);
}

@Component({
  selector: 'drawer-component',
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

export class DrawerComponent implements Compat, OnInit {

  @Output()
  public changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('attr.component')
  public readonly component: string = 'drawer';

  @ViewChild(RadSideDrawerComponent, { static: true })
  public instance: RadSideDrawerComponent;

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
    this.instance.sideDrawer.closeDrawer();
  }

  public show(): void {
    this.instance.sideDrawer.showDrawer();
  }

  public toggle(): void {
    this.instance.sideDrawer.toggleDrawerState();
  }

}
