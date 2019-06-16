import { NgModule, Type } from '@angular/core';
import { NativeScriptSvgModule } from '@teammaestro/nativescript-svg/angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { DrawerCompat } from './compat/drawer/drawer.compat';
import { IconCompat } from './compat/icon/icon.compat';
import { LayoutComponent } from './layout/layout.component';

const compat: Type<any>[] = [
  DrawerCompat,
  IconCompat
];

const materials: Type<any>[] = [
  NativeScriptSvgModule,
  NativeScriptUISideDrawerModule
];

@NgModule({
  declarations: [
    ...compat,
    LayoutComponent,
  ],
  imports: [
    ...materials,
    NativeScriptCommonModule,
    NativeScriptRouterModule
  ]
})

export class SharedModule { }
