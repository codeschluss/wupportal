import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LocalDatabase } from '@ngx-pwa/local-storage';
import { AppModule } from '@wooportal/app';
import { CoreModule } from '@wooportal/core';
import { NativeScriptModule } from 'nativescript-angular';
import { NativeScriptAnimationsModule } from 'nativescript-angular/animations';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { BaseModule } from './base/module';
import { NativeComponent } from './native.component';
import { NativeRouter } from './native.router';
import { PackageJson } from './tools/package';
import { NativeStorageDatabase } from './tools/storage';
import { ErrorModule } from './views/error/error.module';
import { ClientErrorHandler } from './views/error/handler/error.handler';

const platform: any[] = [
  NativeScriptAnimationsModule,
  NativeScriptHttpClientModule,
  NativeScriptModule
];

@NgModule({
  bootstrap: [
    NativeComponent
  ],
  declarations: [
    NativeComponent
  ],
  imports: [
    ...platform,
    AppModule.forRoot(PackageJson),
    BaseModule,
    CoreModule,
    ErrorModule,
    NativeRouter
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
