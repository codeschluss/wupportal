import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRouter } from './public.router';

const PublicDeclarations = [
  PublicComponent
];

const PublicImports = [
  PublicComponent.imports
];

const PublicProviders = [
];

@NgModule({
  declarations: PublicDeclarations,
  imports: [
    CommonModule,
    PublicImports,
    PublicRouter
  ],
  providers: PublicProviders,
  entryComponents: [],
  exports: []
})

export class PublicModule { }
