import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas as freeicons } from '@fortawesome/free-solid-svg-icons';
import { CoreModule, CoreSettings } from '@wooportal/core';
import { NativeScriptAnimationsModule } from 'nativescript-angular/animations';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { device } from 'tns-core-modules/platform';
import { ApiConfiguration } from './api/api-configuration';
import { BaseModule } from './base/base.module';
import { NativeComponent } from './native.component.tns';
import { NativeRouter } from './native.router.tns';
import { ClientManifest } from './utils/manifest';
import { ClientPackage } from './utils/package';
import { SharedModule } from './views/shared/shared.module';

fontawesome.add(freeicons);

@NgModule({
  bootstrap: [NativeComponent],
  declarations: [NativeComponent],
  imports: [
    BaseModule,
    CoreModule,
    NativeRouter,
    NativeScriptAnimationsModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class NativeModule {

  public constructor(
    apiConfiguration: ApiConfiguration,
    coreSettings: CoreSettings,
    router: Router
  ) {
    apiConfiguration.rootUrl = ClientPackage.config.api.rootUrl;
    coreSettings.apiAuthUrl = ClientPackage.config.api.authUrl;
    coreSettings.apiRefreshUrl = ClientPackage.config.api.refreshUrl;
    coreSettings.apiRootUrl = ClientPackage.config.api.rootUrl;
    coreSettings.language = device.language.substr(0, 2);
    coreSettings.title = ClientManifest.shortTitle;

    console.log(device);
    router.events.subscribe((e) => console.log(e));
  }

}
