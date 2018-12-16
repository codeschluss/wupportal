import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { CoreModule } from '@portal/core';
import { FormsModule } from '@portal/forms';
import { ActivityFormComponent } from '../../realm/activity/activity.form';
import { ActivityStepperComponent } from '../../realm/activity/activity.stepper';
import { ActivityTableComponent } from '../../realm/activity/activity.table';
import { AddressFormComponent } from '../../realm/address/address.form';
import { AddressTableComponent } from '../../realm/address/address.table';
import { CategoryTableComponent } from '../../realm/category/category.table';
import { ConfigurationFormComponent } from '../../realm/configuration/configuration.form';
import { ImageFormComponent } from '../../realm/image/image.form';
import { LanguageTableComponent } from '../../realm/language/language.table';
import { OrganisationFormComponent } from '../../realm/organisation/organisation.form';
import { OrganisationStepperComponent } from '../../realm/organisation/organisation.stepper';
import { OrganisationTableComponent } from '../../realm/organisation/organisation.table';
import { ScheduleFormComponent } from '../../realm/schedule/schedule.form';
import { SuburbTableComponent } from '../../realm/suburb/suburb.table';
import { TagTableComponent } from '../../realm/tag/tag.table';
import { TargetGroupTableComponent } from '../../realm/target-group/target-group.table';
import { TranslationFormComponent } from '../../realm/translation/translation.form';
import { UserFormComponent } from '../../realm/user/user.form';
import { UserTableComponent } from '../../realm/user/user.table';
import { AccountPanelComponent } from './account/account.panel';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';
import { ApplicationPanelComponent } from './application/application.panel';
import { OrganisationPanelComponent } from './organisation/organisation.panel';

const forms = [
  ActivityFormComponent,
  AddressFormComponent,
  ConfigurationFormComponent,
  ImageFormComponent,
  OrganisationFormComponent,
  ScheduleFormComponent,
  TranslationFormComponent,
  UserFormComponent
];

const panels = [
  AccountPanelComponent,
  ApplicationPanelComponent,
  OrganisationPanelComponent
];

const steppers = [
  ActivityStepperComponent,
  OrganisationStepperComponent
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
    MatCheckboxModule,
    MatTabsModule
  ]
})

export class AdminModule { }
