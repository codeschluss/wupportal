import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DrawerCompat } from './compat/drawer/drawer.compat';
import { IconCompat } from './compat/icon/icon.compat';
import { LayoutComponent } from './layout/layout.component';

const compat: Type<any>[] = [
  DrawerCompat,
  IconCompat
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    ...compat,
    LayoutComponent,
  ],
  imports: [
    ...materials,
    CommonModule,
    RouterModule
  ]
})

export class SharedModule { }
