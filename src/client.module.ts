import { NoopScrollStrategy as ScrollStrategy } from '@angular/cdk/overlay';
import { LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlSerializer } from '@angular/router';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { CoreModule, CoreSettings, PlatformStrategy } from './core';
import { ClientUrlSerializer } from './tools/serializer';
import { SettingsJson } from './tools/settings';
import { ClientErrorHandler } from './views/error/error.handler';
import { ErrorModule } from './views/error/error.module';
import { SharedModule } from './views/shared/shared.module';

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
    HttpClientModule,
    ServiceWorkerModule.register('/worker.js'),
    SharedModule,
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
