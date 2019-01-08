import { CommonModule } from '@angular/common';
import { Injector, NgModule, Type } from '@angular/core';
import { MatCardModule, MatDialogModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BaseService, CoreModule, CrudModel, CrudProvider } from '@portal/core';
import { BaseFieldComponent, BaseForm, BaseStepper, BaseTable, FormsModule } from '@portal/forms';
import { ActivityFormComponent } from './activity/activity.form';
import { ActivityProvider } from './activity/activity.provider';
import { ActivityStepperComponent } from './activity/activity.stepper';
import { ActivityTableComponent } from './activity/activity.table';
import { AddressFormComponent } from './address/address.form';
import { AddressProvider } from './address/address.provider';
import { AddressStepperComponent } from './address/address.stepper';
import { AddressTableComponent } from './address/address.table';
import { BlogProvider } from './blog/blog.provider';
import { CategoryFormComponent } from './category/category.form';
import { CategoryProvider } from './category/category.provider';
import { CategoryStepperComponent } from './category/category.stepper';
import { CategoryTableComponent } from './category/category.table';
import { ConfigurationFormComponent } from './configuration/configuration.form';
import { ConfigurationProvider } from './configuration/configuration.provider';
import { ImageFieldComponent } from './image/image.field';
import { ImageFormComponent } from './image/image.form';
import { LanguageFormComponent } from './language/language.form';
import { LanguageProvider } from './language/language.provider';
import { LanguageStepperComponent } from './language/language.stepper';
import { LanguageTableComponent } from './language/language.table';
import { OrganisationFormComponent } from './organisation/organisation.form';
import { OrganisationProvider } from './organisation/organisation.provider';
import { OrganisationStepperComponent } from './organisation/organisation.stepper';
import { OrganisationTableComponent } from './organisation/organisation.table';
import { PageProvider } from './page/page.provider';
import { ProviderProvider } from './provider/provider.provider';
import { ProviderTableComponent } from './provider/provider.table';
import { ScheduleFieldComponent } from './schedule/schedule.field';
import { ScheduleFormComponent } from './schedule/schedule.form';
import { SuburbFormComponent } from './suburb/suburb.form';
import { SuburbProvider } from './suburb/suburb.provider';
import { SuburbStepperComponent } from './suburb/suburb.stepper';
import { SuburbTableComponent } from './suburb/suburb.table';
import { TagFormComponent } from './tag/tag.form';
import { TagProvider } from './tag/tag.provider';
import { TagStepperComponent } from './tag/tag.stepper';
import { TagTableComponent } from './tag/tag.table';
import { TargetGroupFormComponent } from './target-group/target-group.form';
import { TargetGroupProvider } from './target-group/target-group.provider';
import { TargetGroupStepperComponent } from './target-group/target-group.stepper';
import { TargetGroupTableComponent } from './target-group/target-group.table';
import { TopicProvider } from './topic/topic.provider';
import { TranslationFormComponent } from './translation/translation.form';
import { TranslationProvider } from './translation/translation.provider';
import { UserFormComponent } from './user/user.form';
import { UserProvider } from './user/user.provider';
import { UserStepperComponent } from './user/user.stepper';
import { UserTableComponent } from './user/user.table';

const fields: Type<BaseFieldComponent>[] = [
  ImageFieldComponent,
  ScheduleFieldComponent
];

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

const materials: Type<any>[] = [
  MatCardModule,
  MatDialogModule,
  MatListModule
];

const providers: Type<CrudProvider<BaseService, CrudModel>>[] = [
  ActivityProvider,
  AddressProvider,
  BlogProvider,
  CategoryProvider,
  ConfigurationProvider,
  LanguageProvider,
  OrganisationProvider,
  PageProvider,
  ProviderProvider,
  SuburbProvider,
  TagProvider,
  TargetGroupProvider,
  TopicProvider,
  TranslationProvider,
  UserProvider
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

@NgModule({
  entryComponents: [
    ...fields,
    ...forms,
    ...steppers
  ],
  declarations: [
    ...fields,
    ...forms,
    ...steppers,
    ...tables
  ],
  exports: [
    FormsModule,
    ...forms,
    ...materials,
    ...steppers,
    ...tables
  ],
  imports: [
    ...materials,
    CommonModule,
    CoreModule,
    FormsModule,
    RouterModule
  ]
})

export class RealmModule {

  public constructor(
    injector: Injector
  ) {
    providers.forEach((provider) => injector.get(provider));
  }

}
