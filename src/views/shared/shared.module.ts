import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule, PlatformCommonModule, PlatformRouterModule } from '@wooportal/core';
import { DrawerCompatComponent } from './compat/drawer/drawer.compat';
import { ExpandCompatComponent } from './compat/expand/expand.compat';
import { IconCompatComponent } from './compat/icon/icon.compat';
import { MarkedCompatComponent } from './compat/marked/marked.compat';
import { NavbarCompatComponent } from './compat/navbar/navbar.compat';
import { PagerCompatComponent } from './compat/pager/pager.compat';
import { LayoutComponent } from './layout/layout.component';

const compat: Type<any>[] = [
  DrawerCompatComponent,
  ExpandCompatComponent,
  IconCompatComponent,
  MarkedCompatComponent,
  NavbarCompatComponent,
  PagerCompatComponent
];

const components: Type<any>[] = [
  LayoutComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
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
  ]
})

export class SharedModule { }
