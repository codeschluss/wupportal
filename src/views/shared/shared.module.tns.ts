import { NgModule, Type } from '@angular/core';
import { NativeScriptSvgModule } from '@teammaestro/nativescript-svg/angular';
import { CoreModule } from '@wooportal/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgRippleModule } from 'nativescript-ng-ripple';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
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
  NativeScriptSvgModule,
  NativeScriptUISideDrawerModule,
  NgRippleModule
];

@NgModule({
  declarations: [
    ...compat,
    ...components
  ],
  imports: [
    ...materials,
    CoreModule,
    NativeScriptCommonModule,
    NativeScriptRouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class SharedModule { }
