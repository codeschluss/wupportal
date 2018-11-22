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
import { TokenInterceptor } from './core/auth/token.interceptor';
import { CrudService } from './core/crud/crud.provider';
import { I18nComponent } from './core/i18n/i18n.component';
import { I18nInterceptor } from './core/i18n/i18n.interceptor';
import { ClientUrlSerializer } from './core/utils/serializer';

fontawesome.add(fas);

const ClientDeclarations = [
  ClientComponent,
  I18nComponent
];

const ClientImports = [
  CrudService.imports
];

const ClientProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: I18nInterceptor, multi: true },
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
