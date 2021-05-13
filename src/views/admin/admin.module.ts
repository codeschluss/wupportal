import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CrudModel, LabelModule } from '../../core';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';
import { BaseChart } from './base/base.chart';
import { BaseFieldComponent } from './base/base.field';
import { BaseForm } from './base/base.form';
import { BasePanel } from './base/base.panel';
import { BaseStepper } from './base/base.stepper';
import { BaseTable } from './base/base.table';
import { CategoryActivitiesChartComponent } from './charts/category-activities.chart';
import { SubscriptionsChartComponent } from './charts/subscriptions.chart';
import { SuburbActivitiesChartComponent } from './charts/suburb-activities.chart';
import { TargetGroupActivitiesChartComponent } from './charts/target-group-activities.chart';
import { BooleanFieldComponent } from './fields/boolean.field';
import { ChipListFieldComponent } from './fields/chip-list.field';
import { EditorFieldComponent } from './fields/editor.field';
import { IconFieldComponent } from './fields/icon.field';
import { ImageFieldComponent } from './fields/image.field';
import { InputFieldComponent } from './fields/input.field';
import { ScheduleFieldComponent } from './fields/schedule.field';
import { SelectFieldComponent } from './fields/select.field';
import { TextareaFieldComponent } from './fields/textarea.field';
import { UrlFieldComponent } from './fields/url.field';
import { VideoFieldComponent } from './fields/video.field';
import { ActivityFormComponent } from './forms/activity.form';
import { AddressFormComponent } from './forms/address.form';
import { BlogpostFormComponent } from './forms/blogpost.form';
import { CategoryFormComponent } from './forms/category.form';
import { ConfigurationFormComponent } from './forms/configuration.form';
import { ImageFormComponent } from './forms/image.form';
import { InfopageFormComponent } from './forms/infopage.form';
import { KeywordFormComponent } from './forms/keyword.form';
import { LabelFormComponent } from './forms/label.form';
import { LanguageFormComponent } from './forms/language.form';
import { MailingFormComponent } from './forms/mailing.form';
import { MarkupFormComponent } from './forms/markup.form';
import { OrganisationFormComponent } from './forms/organisation.form';
import { PushingFormComponent } from './forms/pushing.form';
import { ScheduleFormComponent } from './forms/schedule.form';
import { SubscriptionTypeFormComponent } from './forms/subscription-type.form';
import { SuburbFormComponent } from './forms/suburb.form';
import { TargetGroupFormComponent } from './forms/target-group.form';
import { TopicFormComponent } from './forms/topic.form';
import { TranslationFormComponent } from './forms/translation.form';
import { UserFormComponent } from './forms/user.form';
import { VideoFormComponent } from './forms/video.form';
import { AccountPanelComponent } from './panels/account/account.panel';
import { AnalyticsPanelComponent } from './panels/analytics/analytics.panel';
import { ApplicationPanelComponent } from './panels/application/application.panel';
import { InformationPanelComponent } from './panels/information/information.panel';
import { MessagingPanelComponent } from './panels/messaging/messaging.panel';
import { OrganisationPanelComponent } from './panels/organisation/organisation.panel';
import { PositioningPanelComponent } from './panels/positioning/positioning.panel';
import { PrivilegesPanelComponent } from './panels/privileges/privileges.panel';
import { TaxonomyPanelComponent } from './panels/taxonomy/taxonomy.panel';
import { TranslatePanelComponent } from './panels/translate/translate.panel';
import { DeletePopupComponent } from './popups/delete.popup';
import { PusherPopupComponent } from './popups/pusher.popup';
import { ReloginPopupComponent } from './popups/relogin.popup';
import { RequestPopupComponent } from './popups/request.popup';
import { ActivityStepperComponent } from './steppers/activity.stepper';
import { AddressStepperComponent } from './steppers/address.stepper';
import { BlogpostStepperComponent } from './steppers/blogposts.stepper';
import { CategoryStepperComponent } from './steppers/category.stepper';
import { InfopageStepperComponent } from './steppers/infopage.stepper';
import { KeywordsStepperComponent } from './steppers/keyword.stepper';
import { LanguageStepperComponent } from './steppers/language.stepper';
import { OrganisationStepperComponent } from './steppers/organisation.stepper';
import { SubscriptionTypeStepperComponent } from './steppers/subscription-type.stepper';
import { SuburbStepperComponent } from './steppers/suburb.stepper';
import { TargetGroupStepperComponent } from './steppers/target-group.stepper';
import { TopicStepperComponent } from './steppers/topic.stepper';
import { UserStepperComponent } from './steppers/user.stepper';
import { ActivityTableComponent } from './tables/activity.table';
import { AddressTableComponent } from './tables/address.table';
import { BlogpostTableComponent } from './tables/blogpost.table';
import { CategoryTableComponent } from './tables/category.table';
import { InfopageTableComponent } from './tables/infopage.table';
import { KeywordTableComponent } from './tables/keyword.table';
import { LanguageTableComponent } from './tables/language.table';
import { MembershipTableComponent } from './tables/membership.table';
import { OrganisationTableComponent } from './tables/organisation.table';
import { SubscriptionTypeTableComponent } from './tables/subscription-type.table';
import { SuburbTableComponent } from './tables/suburb.table';
import { TargetGroupTableComponent } from './tables/target-group.table';
import { TopicTableComponent } from './tables/topic.table';
import { UserTableComponent } from './tables/user.table';
import { FileValueAccessorDirective } from './tools/accesor';
import { Paginate } from './tools/paginate';

const charts: Type<BaseChart>[] = [
  CategoryActivitiesChartComponent,
  SubscriptionsChartComponent,
  SuburbActivitiesChartComponent,
  TargetGroupActivitiesChartComponent
];

const components: Type<any>[] = [
  AdminComponent
];

const directives: Type<any>[] = [
  FileValueAccessorDirective
];

const fields: Type<BaseFieldComponent>[] = [
  BaseFieldComponent,
  BooleanFieldComponent,
  ChipListFieldComponent,
  EditorFieldComponent,
  IconFieldComponent,
  InputFieldComponent,
  ImageFieldComponent,
  ScheduleFieldComponent,
  SelectFieldComponent,
  TextareaFieldComponent,
  UrlFieldComponent,
  VideoFieldComponent
];

const forms: Type<BaseForm<CrudModel>>[] = [
  ActivityFormComponent,
  AddressFormComponent,
  BlogpostFormComponent,
  CategoryFormComponent,
  ConfigurationFormComponent,
  ImageFormComponent,
  InfopageFormComponent,
  KeywordFormComponent,
  LabelFormComponent,
  LanguageFormComponent,
  MailingFormComponent,
  MarkupFormComponent,
  OrganisationFormComponent,
  PushingFormComponent,
  ScheduleFormComponent,
  SubscriptionTypeFormComponent,
  SuburbFormComponent,
  TargetGroupFormComponent,
  TopicFormComponent,
  TranslationFormComponent,
  UserFormComponent,
  VideoFormComponent
];

const materials: Type<any>[] = [
  CKEditorModule,
  FontAwesomeModule,
  FormsModule,
  LabelModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  NgxChartsModule,
  ReactiveFormsModule
];

const panels: Type<BasePanel>[] = [
  AccountPanelComponent,
  AnalyticsPanelComponent,
  ApplicationPanelComponent,
  InformationPanelComponent,
  MessagingPanelComponent,
  OrganisationPanelComponent,
  PositioningPanelComponent,
  PrivilegesPanelComponent,
  TaxonomyPanelComponent,
  TranslatePanelComponent
];

const popups: Type<any>[] = [
  DeletePopupComponent,
  PusherPopupComponent,
  ReloginPopupComponent,
  RequestPopupComponent
];

const steppers: Type<BaseStepper<CrudModel>>[] = [
  ActivityStepperComponent,
  AddressStepperComponent,
  BlogpostStepperComponent,
  CategoryStepperComponent,
  InfopageStepperComponent,
  KeywordsStepperComponent,
  LanguageStepperComponent,
  OrganisationStepperComponent,
  SubscriptionTypeStepperComponent,
  SuburbStepperComponent,
  TargetGroupStepperComponent,
  TopicStepperComponent,
  UserStepperComponent
];

const tables: Type<BaseTable<CrudModel>>[] = [
  ActivityTableComponent,
  AddressTableComponent,
  BlogpostTableComponent,
  CategoryTableComponent,
  InfopageTableComponent,
  KeywordTableComponent,
  LanguageTableComponent,
  MembershipTableComponent,
  OrganisationTableComponent,
  SubscriptionTypeTableComponent,
  SuburbTableComponent,
  TargetGroupTableComponent,
  TopicTableComponent,
  UserTableComponent
];

@NgModule({
  declarations: [
    ...charts,
    ...components,
    ...directives,
    ...fields,
    ...forms,
    ...panels,
    ...popups,
    ...steppers,
    ...tables
  ],
  entryComponents: [
    ...fields,
    ...forms,
    ...panels,
    ...popups,
    ...steppers
  ],
  imports: [
    ...materials,
    AdminRouter,
    CommonModule
  ],
  providers: [
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
    { provide: MatPaginatorIntl, useClass: Paginate }
  ]
})

export class AdminModule { }
