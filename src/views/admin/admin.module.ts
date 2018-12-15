import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import { CoreModule } from '@portal/core';
import { FormsModule } from '@portal/forms';
import { ActivityFormComponent } from '../../realm/activity/activity.form';
import { ActivityStepperComponent } from '../../realm/activity/activity.stepper';
import { ActivityTableComponent } from '../../realm/activity/activity.table';
import { AddressFormComponent } from '../../realm/address/address.form';
import { AddressTableComponent } from '../../realm/address/address.table';
import { CategoryTableComponent } from '../../realm/category/category.table';
import { ConfigurationFormComponent } from '../../realm/configuration/configuration.form';
import { LanguageTableComponent } from '../../realm/language/language.table';
import { OrganisationTableComponent } from '../../realm/organisation/organisation.table';
import { SuburbTableComponent } from '../../realm/suburb/suburb.table';
import { TagTableComponent } from '../../realm/tag/tag.table';
import { TargetGroupTableComponent } from '../../realm/target-group/target-group.table';
import { UserFormComponent } from '../../realm/user/user.form';
import { UserTableComponent } from '../../realm/user/user.table';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';
import { AccountPanelComponent } from './panels/account.panel';
import { ApplicationPanelComponent } from './panels/application.panel';

const forms = [
  ActivityFormComponent,
  AddressFormComponent,
  ConfigurationFormComponent,
  UserFormComponent
];

const panels = [
  AccountPanelComponent,
  ApplicationPanelComponent
];

const steppers = [
  ActivityStepperComponent,
];

const tables = [
  ActivityTableComponent,
  AddressTableComponent,
  CategoryTableComponent,
  LanguageTableComponent,
  OrganisationTableComponent,
  SuburbTableComponent,
  TagTableComponent,
  TargetGroupTableComponent,
  UserTableComponent
];

@NgModule({
  entryComponents: [
    ...forms,
    ...panels,
    ...steppers
  ],
  declarations: [
    AdminComponent,
    ...forms,
    ...panels,
    ...steppers,
    ...tables
  ],
  imports: [
    AdminRouter,
    CommonModule,
    CoreModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule
  ]
})

export class AdminModule { }
