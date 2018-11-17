import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlSerializer } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { ApiModule } from './core/api/api.module';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { BaseProvider } from './core/base/base.provider';
import { I18nComponent } from './utils/i18n.component';
import { LogoComponent } from './utils/logo.component';
import { ClientUrlSerializer } from './utils/serializer';

const ClientDeclarations = [
  ClientComponent,
  I18nComponent,
  LogoComponent
];

const ClientImports = [
  BaseProvider.imports,
  ClientComponent.imports,
  I18nComponent.imports,
  LogoComponent.imports
];

const ClientProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: UrlSerializer, useClass: ClientUrlSerializer }
];

@NgModule({
  bootstrap: [ClientComponent],
  declarations: ClientDeclarations,
  imports: [
    ApiModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClientImports,
    ClientRouter,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js')
  ],
  providers: ClientProviders,
  entryComponents: [],
  exports: []
})

export class ClientModule { }
