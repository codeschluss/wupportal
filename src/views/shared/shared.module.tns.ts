import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { AppRouterModule } from '@wooportal/app';
import { NativeScriptCommonModule as AppCommonModule } from 'nativescript-angular/common';
import { NgRippleModule } from 'nativescript-ng-ripple';
import { NativeScriptUICalendarModule } from 'nativescript-ui-calendar/angular/calendar-directives';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { CalendarComponent } from './calendar/calendar.component';
import { DrawerComponent } from './drawer/drawer.component';
import { ExpandComponent } from './expand/expand.component';
import { I18nComponent } from './i18n/i18n.component';
import { IconComponent } from './icon/icon.component';
import { MarkedComponent } from './marked/marked.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagerComponent } from './pager/pager.component';
import { SelectComponent, SelectPopupComponent } from './select/select.component.tns';
import { SharedComponent } from './shared.component';

const components: Type<any>[] = [
  CalendarComponent,
  DrawerComponent,
  ExpandComponent,
  I18nComponent,
  IconComponent,
  MarkedComponent,
  NavbarComponent,
  PagerComponent,
  SelectComponent,
  SharedComponent
];

const materials: Type<any>[] = [
  NativeScriptUICalendarModule,
  NativeScriptUISideDrawerModule,
  NgRippleModule
];

const popups: Type<any>[] = [
  SelectPopupComponent
];

@NgModule({
  declarations: [
    ...components,
    ...popups
  ],
  entryComponents: [
    ...popups
  ],
  exports: [
    ...components
  ],
  imports: [
    ...materials,
    AppCommonModule,
    AppRouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class SharedModule { }
