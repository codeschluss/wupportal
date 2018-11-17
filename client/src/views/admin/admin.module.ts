import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';
import { ActivityEditComponent } from './activity/activity.edit.component';
import { OrganisationEditComponent } from './organisation/organisation.edit.component';


const AdminDeclarations = [
  AdminComponent,
  ActivityEditComponent,
  OrganisationEditComponent
];

const AdminImports = [
  AdminComponent.imports
];

const AdminProviders = [
];

@NgModule({
  declarations: AdminDeclarations,
  imports: [
    CommonModule,
    AdminImports,
    AdminRouter
  ],
  providers: AdminProviders,
  entryComponents: [],
  exports: []
})

export class AdminModule { }
