import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas as freeicons } from '@fortawesome/free-solid-svg-icons';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { CoreModule } from '@wooportal/core';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { ErrorModule } from './error/error.module';
import { RealmModule } from './realm/realm.module';
import { ClientManifest } from './utils/manifest';
import { ClientPackage } from './utils/package';

fontawesome.add(freeicons);

@NgModule({
  bootstrap: [ClientComponent],
  declarations: [ClientComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ssr' }),
    BrowserAnimationsModule,
    ClientRouter,
    CoreModule.forRoot({
      apiAuthUrl: ClientPackage.config.api.authUrl,
      apiRefreshUrl: ClientPackage.config.api.refreshUrl,
      apiRootUrl: ClientPackage.config.api.rootUrl,
      appUrl: ClientManifest.startUrl,
      defaultLanguage: ClientPackage.config.defaults.language,
      defaultTitle: ClientManifest.shortTitle
    }),
    ErrorModule,
    HttpClientModule,
    RealmModule,
    TransferHttpCacheModule
  ]
})

export class ClientModule { }
