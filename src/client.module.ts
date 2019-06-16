import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Inject, Injector, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas as freeicons } from '@fortawesome/free-solid-svg-icons';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { CoreModule, CoreSettings } from '@wooportal/core';
import { ApiConfiguration } from './api/api-configuration';
import { BaseModule } from './base/base.module';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { ClientManifest } from './utils/manifest';
import { ClientPackage } from './utils/package';
import { SharedModule } from './views/shared/shared.module';


fontawesome.add(freeicons);

@NgModule({
  bootstrap: [ClientComponent],
  declarations: [ClientComponent],
  imports: [
    BaseModule,
    BrowserModule.withServerTransition({ appId: 'ssr' }),
    BrowserAnimationsModule,
    ClientRouter,
    CoreModule,
    HttpClientModule,
    SharedModule,
    TransferHttpCacheModule
  ]
})

export class ClientModule {

  public constructor(
    apiConfiguration: ApiConfiguration,
    coreSettings: CoreSettings,
    injector: Injector,
    @Inject(PLATFORM_ID) platformId: any
  ) {
    apiConfiguration.rootUrl = ClientPackage.config.api.rootUrl;
    coreSettings.apiAuthUrl = ClientPackage.config.api.authUrl;
    coreSettings.apiRefreshUrl = ClientPackage.config.api.refreshUrl;
    coreSettings.apiRootUrl = ClientPackage.config.api.rootUrl;
    coreSettings.title = ClientManifest.shortTitle;

    switch (true) {
      default:
        coreSettings.language = ClientPackage.config.translations.defaultLocale;
        break;

      case isPlatformServer(platformId):
        const request = injector.get('express').request;
        coreSettings.language = request.headers['accept-language'].substr(0, 2);
        break;

      case isPlatformBrowser(platformId) && !!navigator.language:
        coreSettings.language = navigator.language.substr(0, 2);
        break;
    }
  }

}
