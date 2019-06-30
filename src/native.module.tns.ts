import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas as freeicons } from '@fortawesome/free-solid-svg-icons';
import { CoreModule } from '@wooportal/core';
import { NativeScriptAnimationsModule } from 'nativescript-angular/animations';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { ErrorModule } from './error/error.module';
import { NativeComponent } from './native.component.tns';
import { NativeRouter } from './native.router.tns';
import { RealmModule } from './realm/realm.module';
import { ClientManifest } from './utils/manifest';
import { ClientPackage } from './utils/package';

fontawesome.add(freeicons);

@NgModule({
  bootstrap: [NativeComponent],
  declarations: [NativeComponent],
  imports: [
    CoreModule.forRoot({
      apiAuthUrl: ClientPackage.config.api.authUrl,
      apiRefreshUrl: ClientPackage.config.api.refreshUrl,
      apiRootUrl: ClientPackage.config.api.rootUrl,
      appUrl: ClientManifest.startUrl,
      defaultLanguage: ClientPackage.config.defaults.language,
      defaultTitle: ClientManifest.shortTitle,
    }),
    ErrorModule,
    NativeRouter,
    NativeScriptAnimationsModule,
    NativeScriptHttpClientModule,
    NativeScriptModule,
    RealmModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class NativeModule { }
