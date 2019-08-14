import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas as freeicons } from '@fortawesome/free-solid-svg-icons';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { CoreModule } from '@wooportal/core';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { ErrorModule } from './error/error.module';
import { ClientErrorHandler } from './error/handler/error.handler';
import { RealmModule } from './realm/realm.module';
import { ClientPackage } from './utils/package';

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
      appUrl: ClientPackage.config.defaults.appUrl,
      defaultLanguage: ClientPackage.config.defaults.language,
      defaultTitle: ClientPackage.config.defaults.title
    }),
    ErrorModule,
    HttpClientModule,
    RealmModule,
    TransferHttpCacheModule

    // TODO: remove
    , MatMenuModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ClientErrorHandler }
  ]
})

export class ClientModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(freeicons);
  }

}
