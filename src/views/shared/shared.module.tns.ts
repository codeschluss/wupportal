import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgRippleModule } from 'nativescript-ng-ripple';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { BaseModule } from '../../base/base.module';
import { DrawerCompatComponent } from './compat/drawer/drawer.compat';
import { IconCompatComponent } from './compat/icon/icon.compat';
import { NavbarCompatComponent } from './compat/navbar/navbar.compat';
import { LayoutComponent } from './layout/layout.component';

const compat: Type<any>[] = [
  DrawerCompatComponent,
  IconCompatComponent,
  NavbarCompatComponent
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
    BaseModule,
    NativeScriptCommonModule,
    NativeScriptRouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class SharedModule { }
