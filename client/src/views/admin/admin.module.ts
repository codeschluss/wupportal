import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatBadgeModule, MatButtonModule, MatDialogModule, MatListModule, MatSlideToggleModule, MatTabsModule, MAT_TABS_CONFIG } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from '@portal/core';
import { RealmModule } from '../../realm/realm.module';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';
import { DeleteDialogComponent } from './dialogs/delete.dialog';
import { AccountPanelComponent } from './panels/account/account.panel';
import { ApplicationPanelComponent } from './panels/application/application.panel';
import { OrganisationPanelComponent } from './panels/organisation/organisation.panel';

const dialogs: Type<any>[] = [
  DeleteDialogComponent
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
  MatListModule,
  MatSlideToggleModule,
  MatTabsModule
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
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } }
  ]
})

export class AdminModule { }
