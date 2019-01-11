import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatBadgeModule, MatButtonModule, MatDialogModule, MatDividerModule, MatListModule, MatMenuModule, MatPaginatorIntl, MatSlideToggleModule, MatTabsModule, MatToolbarModule, MAT_TABS_CONFIG } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from '@portal/core';
import { MatPagerIntl } from '@portal/forms';
import { RealmModule } from '../../realm/realm.module';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';
import { DeleteDialogComponent } from './dialogs/delete.dialog';
import { ReloginDialogComponent } from './dialogs/relogin.dialog';
import { RequestDialogComponent } from './dialogs/request.dialog';
import { AccountPanelComponent } from './panels/account/account.panel';
import { ApplicationPanelComponent } from './panels/application/application.panel';
import { OrganisationPanelComponent } from './panels/organisation/organisation.panel';

const dialogs: Type<any>[] = [
  DeleteDialogComponent,
  ReloginDialogComponent,
  RequestDialogComponent
];

const panels: Type<any>[] = [
  AccountPanelComponent,
  ApplicationPanelComponent,
  OrganisationPanelComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  MatBadgeModule,
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatListModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  ScrollingModule
];

@NgModule({
  entryComponents: [
    ...dialogs,
    ...panels
  ],
  declarations: [
    ...dialogs,
    ...panels,
    AdminComponent
  ],
  imports: [
    ...materials,
    AdminRouter,
    CommonModule,
    CoreModule,
    RealmModule
  ],
  providers: [
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
    { provide: MatPaginatorIntl, useClass: MatPagerIntl }
  ]
})

export class AdminModule { }
