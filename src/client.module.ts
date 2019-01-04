import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas as freeicons } from '@fortawesome/free-solid-svg-icons';
import { CoreModule, CoreSettings } from '@portal/core';
import { ApiConfiguration } from './api/api-configuration';
import { ApiModule } from './api/api.module';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { RealmModule } from './realm/realm.module';
import { ClientPackage } from './utils/package';

fontawesome.add(freeicons);

@NgModule({
  bootstrap: [ClientComponent],
  declarations: [
    ClientComponent
  ],
  imports: [
    ApiModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClientRouter,
    CoreModule,
    HttpClientModule,
    RealmModule
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
    coreSettings.nominatimEndpoint = ClientPackage.config.nominatim.endpoint;
    coreSettings.nominatimParams = ClientPackage.config.nominatim.params;
  }

}
