import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatBadgeModule, MatButtonModule, MatSlideToggleModule, MatTabsModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule, CrudModel } from '@portal/core';
import { BaseForm, BaseStepper, BaseTable, FormsModule } from '@portal/forms';
import { ActivityFormComponent } from '../../realm/activity/activity.form';
import { ActivityStepperComponent } from '../../realm/activity/activity.stepper';
import { ActivityTableComponent } from '../../realm/activity/activity.table';
import { AddressFormComponent } from '../../realm/address/address.form';
import { AddressStepperComponent } from '../../realm/address/address.stepper';
import { AddressTableComponent } from '../../realm/address/address.table';
import { CategoryFormComponent } from '../../realm/category/category.form';
import { CategoryStepperComponent } from '../../realm/category/category.stepper';
import { CategoryTableComponent } from '../../realm/category/category.table';
import { ConfigurationFormComponent } from '../../realm/configuration/configuration.form';
import { ImageFormComponent } from '../../realm/image/image.form';
import { LanguageFormComponent } from '../../realm/language/language.form';
import { LanguageStepperComponent } from '../../realm/language/language.stepper';
import { LanguageTableComponent } from '../../realm/language/language.table';
import { OrganisationFormComponent } from '../../realm/organisation/organisation.form';
import { OrganisationStepperComponent } from '../../realm/organisation/organisation.stepper';
import { OrganisationTableComponent } from '../../realm/organisation/organisation.table';
import { ProviderTableComponent } from '../../realm/provider/provider.table';
import { ScheduleFormComponent } from '../../realm/schedule/schedule.form';
import { SuburbFormComponent } from '../../realm/suburb/suburb.form';
import { SuburbStepperComponent } from '../../realm/suburb/suburb.stepper';
import { SuburbTableComponent } from '../../realm/suburb/suburb.table';
import { TagFormComponent } from '../../realm/tag/tag.form';
import { TagStepperComponent } from '../../realm/tag/tag.stepper';
import { TagTableComponent } from '../../realm/tag/tag.table';
import { TargetGroupFormComponent } from '../../realm/target-group/target-group.form';
import { TargetGroupStepperComponent } from '../../realm/target-group/target-group.stepper';
import { TargetGroupTableComponent } from '../../realm/target-group/target-group.table';
import { TranslationFormComponent } from '../../realm/translation/translation.form';
import { UserFormComponent } from '../../realm/user/user.form';
import { UserStepperComponent } from '../../realm/user/user.stepper';
import { UserTableComponent } from '../../realm/user/user.table';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';
import { AccountPanelComponent } from './panels/account/account.panel';
import { ApplicationPanelComponent } from './panels/application/application.panel';
import { OrganisationPanelComponent } from './panels/organisation/organisation.panel';

const forms: Type<BaseForm<CrudModel>>[] = [
  ActivityFormComponent,
  AddressFormComponent,
  CategoryFormComponent,
  ConfigurationFormComponent,
  ImageFormComponent,
  LanguageFormComponent,
  OrganisationFormComponent,
  ScheduleFormComponent,
  SuburbFormComponent,
  TagFormComponent,
  TargetGroupFormComponent,
  TranslationFormComponent,
  UserFormComponent
];

const steppers: Type<BaseStepper<CrudModel>>[] = [
  ActivityStepperComponent,
  AddressStepperComponent,
  CategoryStepperComponent,
  LanguageStepperComponent,
  OrganisationStepperComponent,
  SuburbStepperComponent,
  TagStepperComponent,
  TargetGroupStepperComponent,
  UserStepperComponent
];

const tables: Type<BaseTable<CrudModel>>[] = [
  ActivityTableComponent,
  AddressTableComponent,
  CategoryTableComponent,
  LanguageTableComponent,
  OrganisationTableComponent,
  ProviderTableComponent,
  SuburbTableComponent,
  TagTableComponent,
  TargetGroupTableComponent,
  UserTableComponent
];

const panels: Type<any>[] = [
  AccountPanelComponent,
  ApplicationPanelComponent,
  OrganisationPanelComponent
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
    FontAwesomeModule,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTabsModule
  ]
})

export class AdminModule { }
