import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';

const AdminProviders = [
];

const AdminEntryComponents = [
];

const AdminDeclarations = [
  AdminComponent,
];

const AdminImports = [
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
