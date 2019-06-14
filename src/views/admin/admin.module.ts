import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule, CrudModel } from '@wooportal/core';
import { BaseFieldComponent, BaseForm, BaseStepper, BaseTable, FormsModule, MatPagerIntl } from '@wooportal/forms';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';
import { DeleteDialogComponent } from './dialogs/delete.dialog';
import { ReloginDialogComponent } from './dialogs/relogin.dialog';
import { RequestDialogComponent } from './dialogs/request.dialog';
import { ImageFieldComponent } from './fields/image.field';
import { ScheduleFieldComponent } from './fields/schedule.field';
import { ActivityFormComponent } from './forms/activity.form';
import { AddressFormComponent } from './forms/address.form';
import { BlogFormComponent } from './forms/blog.form';
import { CategoryFormComponent } from './forms/category.form';
import { ConfigurationFormComponent } from './forms/configuration.form';
import { ImageFormComponent } from './forms/image.form';
import { LanguageFormComponent } from './forms/language.form';
import { OrganisationFormComponent } from './forms/organisation.form';
import { PageFormComponent } from './forms/page.form';
import { ScheduleFormComponent } from './forms/schedule.form';
import { SuburbFormComponent } from './forms/suburb.form';
import { TagFormComponent } from './forms/tag.form';
import { TargetGroupFormComponent } from './forms/target-group.form';
import { TopicFormComponent } from './forms/topic.form';
import { TranslationFormComponent } from './forms/translation.form';
import { UserFormComponent } from './forms/user.form';
import { AccountPanelComponent } from './panels/account/account.panel';
import { ApplicationPanelComponent } from './panels/application/application.panel';
import { OrganisationPanelComponent } from './panels/organisation/organisation.panel';
import { PositioningPanelComponent } from './panels/positioning/positioning.panel';
import { PrivilegesPanelComponent } from './panels/privileges/privileges.panel';
import { ActivityStepperComponent } from './steppers/activity.stepper';
import { AddressStepperComponent } from './steppers/address.stepper';
import { BlogStepperComponent } from './steppers/blog.stepper';
import { CategoryStepperComponent } from './steppers/category.stepper';
import { LanguageStepperComponent } from './steppers/language.stepper';
import { OrganisationStepperComponent } from './steppers/organisation.stepper';
import { PageStepperComponent } from './steppers/page.stepper';
import { SuburbStepperComponent } from './steppers/suburb.stepper';
import { TagStepperComponent } from './steppers/tag.stepper';
import { TargetGroupStepperComponent } from './steppers/target-group.stepper';
import { TopicStepperComponent } from './steppers/topic.stepper';
import { UserStepperComponent } from './steppers/user.stepper';
import { ActivityTableComponent } from './tables/activity.table';
import { AddressTableComponent } from './tables/address.table';
import { BlogTableComponent } from './tables/blog.table';
import { CategoryTableComponent } from './tables/category.table';
import { LanguageTableComponent } from './tables/language.table';
import { OrganisationTableComponent } from './tables/organisation.table';
import { PageTableComponent } from './tables/page.table';
import { ProviderTableComponent } from './tables/provider.table';
import { SuburbTableComponent } from './tables/suburb.table';
import { TagTableComponent } from './tables/tag.table';
import { TargetGroupTableComponent } from './tables/target-group.table';
import { TopicTableComponent } from './tables/topic.table';
import { UserTableComponent } from './tables/user.table';

const dialogs: Type<any>[] = [
  DeleteDialogComponent,
  ReloginDialogComponent,
  RequestDialogComponent
];

const fields: Type<BaseFieldComponent>[] = [
  ImageFieldComponent,
  ScheduleFieldComponent
];

const forms: Type<BaseForm<CrudModel>>[] = [
  ActivityFormComponent,
  AddressFormComponent,
  BlogFormComponent,
  CategoryFormComponent,
  ConfigurationFormComponent,
  ImageFormComponent,
  LanguageFormComponent,
  OrganisationFormComponent,
  PageFormComponent,
  ScheduleFormComponent,
  SuburbFormComponent,
  TagFormComponent,
  TargetGroupFormComponent,
  TopicFormComponent,
  TranslationFormComponent,
  UserFormComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatListModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatTabsModule
];

const panels: Type<any>[] = [
  AccountPanelComponent,
  ApplicationPanelComponent,
  OrganisationPanelComponent,
  PositioningPanelComponent,
  PrivilegesPanelComponent
];

const steppers: Type<BaseStepper<CrudModel>>[] = [
  ActivityStepperComponent,
  AddressStepperComponent,
  BlogStepperComponent,
  CategoryStepperComponent,
  LanguageStepperComponent,
  OrganisationStepperComponent,
  PageStepperComponent,
  SuburbStepperComponent,
  TagStepperComponent,
  TargetGroupStepperComponent,
  TopicStepperComponent,
  UserStepperComponent
];

const tables: Type<BaseTable<CrudModel>>[] = [
  ActivityTableComponent,
  AddressTableComponent,
  BlogTableComponent,
  CategoryTableComponent,
  LanguageTableComponent,
  OrganisationTableComponent,
  PageTableComponent,
  ProviderTableComponent,
  SuburbTableComponent,
  TagTableComponent,
  TargetGroupTableComponent,
  TopicTableComponent,
  UserTableComponent
];

@NgModule({
  entryComponents: [
    ...dialogs,
    ...fields,
    ...forms,
    ...panels,
    ...steppers
  ],
  declarations: [
    ...dialogs,
    ...fields,
    ...forms,
    ...panels,
    ...steppers,
    ...tables,
    AdminComponent
  ],
  imports: [
    ...materials,
    AdminRouter,
    CommonModule,
    CoreModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
    { provide: MatPaginatorIntl, useClass: MatPagerIntl }
  ]
})

export class AdminModule { }
