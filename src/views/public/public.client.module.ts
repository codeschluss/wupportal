import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicClientComponent } from './public.client.component';
import { PublicClientRouter } from './public.client.router';

const PublicClientDeclarations = [
  PublicClientComponent
];

const PublicClientImports = [
  PublicClientComponent.imports
];

const PublicClientProviders = [
];

@NgModule({
  declarations: PublicClientDeclarations,
  imports: [
    CommonModule,
    PublicClientImports,
    PublicClientRouter
  ],
  providers: PublicClientProviders,
  entryComponents: [],
  exports: []
})

export class PublicClientModule { }
