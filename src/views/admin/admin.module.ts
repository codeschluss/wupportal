import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRouter } from './admin.router';

const AdminDeclarations = [
  AdminComponent
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
