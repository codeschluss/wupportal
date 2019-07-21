import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { CoreModule, PlatformRouterModule } from '@wooportal/core';
import { NativeScriptCommonModule as PlatformCommonModule } from 'nativescript-angular/common';
import { NgRippleModule } from 'nativescript-ng-ripple';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { DrawerCompatComponent } from './compat/drawer/drawer.compat';
import { IconCompatComponent } from './compat/icon/icon.compat';
import { NavbarCompatComponent } from './compat/navbar/navbar.compat';
import { PagerCompatComponent } from './compat/pager/pager.compat';
import { LayoutComponent } from './layout/layout.component';

const compat: Type<any>[] = [
  DrawerCompatComponent,
  IconCompatComponent,
  NavbarCompatComponent,
  PagerCompatComponent
];

const components: Type<any>[] = [
  LayoutComponent
];

const materials: Type<any>[] = [
  NativeScriptUISideDrawerModule,
  NgRippleModule
];

@NgModule({
  declarations: [
    ...compat,
    ...components
  ],
  exports: [
    ...compat
  ],
  imports: [
    ...materials,
    CoreModule,
    PlatformCommonModule,
    PlatformRouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class SharedModule { }
