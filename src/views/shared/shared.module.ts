import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { AppCommonModule, AppRouterModule } from '@wooportal/app';
import { CalendarComponent } from './calendar/calendar.component';
import { DrawerComponent } from './drawer/drawer.component';
import { ExpandComponent } from './expand/expand.component';
import { I18nComponent } from './i18n/i18n.component';
import { IconComponent } from './icon/icon.component';
import { MarkedComponent } from './marked/marked.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagerComponent } from './pager/pager.component';
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
  SharedComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    ...materials,
    AppCommonModule,
    AppRouterModule
  ]
})

export class SharedModule { }
