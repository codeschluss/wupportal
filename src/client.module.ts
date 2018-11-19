import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlSerializer } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { ApiModule } from './core/api/api.module';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { BaseProvider } from './core/base/base.provider';
import { ClientUrlSerializer } from './core/base/serializer';
import { I18nComponent } from './core/i18n/i18n.component';

fontawesome.add(fas);

const ClientDeclarations = [
  ClientComponent,
  I18nComponent
];

const ClientImports = [
  BaseProvider.imports,
  I18nComponent.imports
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
