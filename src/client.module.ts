import { NoopScrollStrategy as ScrollStrategy } from '@angular/cdk/overlay';
import { LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlSerializer } from '@angular/router';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { Observable } from 'rxjs';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { CoreModule, CoreSettings, PlatformStrategy } from './core';
import { IpAddressInterceptor } from './core/platform/ip-address.interceptor';
import { ClientUrlSerializer } from './tools/serializer';
import { SettingsJson } from './tools/settings';
import { ClientErrorHandler } from './views/error/error.handler';
import { ErrorModule } from './views/error/error.module';
import { GlobalModule } from './views/global/global.module';

@NgModule({
  bootstrap: [
    ClientComponent
  ],
  declarations: [
    ClientComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'wooportal-app' }),
    ClientRouter,
    CoreModule,
    ErrorModule,
    GlobalModule,
    HttpClientModule,
    ServiceWorkerModule.register('/worker.js'),
    TransferHttpCacheModule
  ],
  providers: [
    { provide: CoreSettings, useValue: SettingsJson },
    { provide: ErrorHandler, useClass: ClientErrorHandler },
    { provide: LocationStrategy, useClass: PlatformStrategy },
    { provide: UrlSerializer, useClass: ClientUrlSerializer },
    {
      provide: MAT_MENU_SCROLL_STRATEGY,
      useValue: () => new ScrollStrategy()
    },
    {
      deps: [CoreSettings],
      provide: SwRegistrationOptions,
      useFactory: (settings: CoreSettings) => ({
        enabled: settings.app.profile === 'production' &&
          typeof cordova === 'object' && cordova.platformId === 'browser'
      })
    },
    { provide: HTTP_INTERCEPTORS, useClass: IpAddressInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: retrieveIpAddress,
      deps: [IpAddressInterceptor],
      multi: true
    }
  ]
})

export class ClientModule {

  public constructor(
    iconLibrary: FaIconLibrary
  ) {
    iconLibrary.addIconPacks(fab, fas);
  }

}

function retrieveIpAddress(service: IpAddressInterceptor): () => Observable<any> {
 return () => service.retrieveIpAddress();
}

