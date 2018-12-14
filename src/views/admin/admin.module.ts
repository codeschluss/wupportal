import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import { CoreModule } from '@portal/core';
import { FormsModule } from '@portal/forms';
import { ActivityFormComponent } from 'src/realm/activity/activity.form';
import { ActivityStepperComponent } from 'src/realm/activity/activity.stepper';
import { ActivityTableComponent } from 'src/realm/activity/activity.table';
import { AddressFormComponent } from 'src/realm/address/address.form';
import { AddressTableComponent } from 'src/realm/address/address.table';
import { CategoryTableComponent } from 'src/realm/category/category.table';
import { ConfigurationFormComponent } from 'src/realm/configuration/configuration.form';
import { LanguageTableComponent } from 'src/realm/language/language.table';
import { OrganisationTableComponent } from 'src/realm/organisation/organisation.table';
import { SuburbTableComponent } from 'src/realm/suburb/suburb.table';
import { TagTableComponent } from 'src/realm/tag/tag.table';
import { TargetGroupTableComponent } from 'src/realm/target-group/target-group.table';
import { UserFormComponent } from 'src/realm/user/user.form';
import { UserTableComponent } from 'src/realm/user/user.table';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';
import { LoginComponent } from './login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register.component';
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
    ...steppers
  ],
  declarations: [
    AdminComponent,
    LoginComponent,
    RegisterComponent,
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
    MatTabsModule,
    CoreModule,
    FlexLayoutModule,
    LoginComponent.imports,
    RegisterComponent.imports
  ]
})

export class AdminModule { }
