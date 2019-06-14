import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
    coreSettings: CoreSettings
  ) {
    apiConfiguration.rootUrl = ClientPackage.config.api.rootUrl;
    coreSettings.apiAuthUrl = ClientPackage.config.api.authUrl;
    coreSettings.apiUrl = ClientPackage.config.api.rootUrl;
    coreSettings.apiRefreshUrl = ClientPackage.config.api.refreshUrl;
    coreSettings.title = ClientManifest.shortTitle;
  }

}
