import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LocalDatabase } from '@ngx-pwa/local-storage';
import { CoreModule } from '@wooportal/core';
import { NativeScriptAnimationsModule } from 'nativescript-angular/animations';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { ErrorModule } from './error/error.module';
import { ClientErrorHandler } from './error/handler/error.handler';
import { NativeComponent } from './native.component.tns';
import { NativeRouter } from './native.router.tns';
import { RealmModule } from './realm/realm.module';
import { ClientPackage } from './utils/package';
import { NativeStorageDatabase } from './utils/storage';

@NgModule({
  bootstrap: [NativeComponent],
  declarations: [NativeComponent],
  imports: [
    CoreModule.forRoot({
      apiAuthUrl: ClientPackage.config.api.authUrl,
      apiRefreshUrl: ClientPackage.config.api.refreshUrl,
      apiRootUrl: ClientPackage.config.api.rootUrl,
      appUrl: ClientPackage.config.defaults.appUrl,
      defaultLanguage: ClientPackage.config.defaults.language,
      defaultTitle: ClientPackage.config.defaults.title
    }),
    ErrorModule,
    NativeRouter,
    NativeScriptAnimationsModule,
    NativeScriptHttpClientModule,
    NativeScriptModule,
    RealmModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ClientErrorHandler },
    { provide: LocalDatabase, useClass: NativeStorageDatabase }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class NativeModule {

  constructor(
    iconLibrary: FaIconLibrary
  ) {
    iconLibrary.addIconPacks(fab, fas);
  }

}
