import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlSerializer } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { ApiModule } from './core/api/api.module';
import { AbstractProvider } from './core/providers/abstract.provider';
import { I18nComponent } from './utils/i18n.component';
import { LogoComponent } from './utils/logo.component';
import { ClientUrlSerializer } from './utils/serializer';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'hammerjs';

/*
 * Fontawesome icons
 */
fontawesome.add(fas);

const ClientDeclarations = [
  ClientComponent,
  I18nComponent,
  LogoComponent
];

const ClientImports = [
  AbstractProvider.imports,
  ClientComponent.imports,
  I18nComponent.imports,
  LogoComponent.imports
];

const ClientProviders = [
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
