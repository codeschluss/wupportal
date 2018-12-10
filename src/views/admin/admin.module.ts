import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@portal/core';
import { FormsModule } from '@portal/forms';
import { ActivityFormComponent } from 'src/realm/activity/activity.form';
import { ActivityStepperComponent } from 'src/realm/activity/activity.stepper';
import { AddressFormComponent } from 'src/realm/address/address.form';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';

const AdminProviders = [
];

const AdminEntryComponents = [
  ActivityFormComponent,
  ActivityStepperComponent,
  AddressFormComponent
];

const AdminDeclarations = [
  AdminComponent,
];

const AdminImports = [
  CoreModule,
  FormsModule
];

@NgModule({
  providers: AdminProviders,
  entryComponents: AdminEntryComponents,
  declarations: [
    ...AdminDeclarations,
    ...AdminEntryComponents
  ],
  imports: [
    AdminImports,
    AdminRouter,
    CommonModule,
    ReactiveFormsModule
  ]
})

export class AdminModule { }
