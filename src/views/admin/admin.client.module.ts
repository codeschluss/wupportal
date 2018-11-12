import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminClientComponent } from './admin.client.component';
import { AdminClientRouter } from './admin.client.router';

const AdminClientDeclarations = [
  AdminClientComponent
];

const AdminClientImports = [
  AdminClientComponent.imports
];

const AdminClientProviders = [
];

@NgModule({
  declarations: AdminClientDeclarations,
  imports: [
    CommonModule,
    AdminClientImports,
    AdminClientRouter
  ],
  providers: AdminClientProviders,
  entryComponents: [],
  exports: []
})

export class AdminClientModule { }
