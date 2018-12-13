import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { CoreModule } from '@portal/core';
import { FormsModule } from '@portal/forms';
import { ActivityFormComponent } from 'src/realm/activity/activity.form';
import { ActivityStepperComponent } from 'src/realm/activity/activity.stepper';
import { ActivityTableComponent } from 'src/realm/activity/activity.table';
import { AddressFormComponent } from 'src/realm/address/address.form';
import { UserFormComponent } from 'src/realm/user/user.form';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';
import { AccountPanelComponent } from './panels/account.panel';

const entryComponents = [
  ActivityFormComponent,
  ActivityStepperComponent,
  AddressFormComponent
];

const declarations = [
  AdminComponent,
  ActivityTableComponent,
  UserFormComponent,
  AccountPanelComponent
];

@NgModule({
  entryComponents: entryComponents,
  declarations: [
    ...declarations,
    ...entryComponents
  ],
  imports: [
    AdminRouter,
    CommonModule,
    CoreModule,
    FormsModule,
    MatTabsModule
  ]
})

export class AdminModule { }
