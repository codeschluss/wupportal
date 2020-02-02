import { NoopScrollStrategy as ScrollStrategy } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppModule } from '@wooportal/app';
import { CoreModule } from '@wooportal/core';
import { BaseModule } from './base/module';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { PackageJson } from './tools/package';
import { ErrorModule } from './views/error/error.module';
import { ClientErrorHandler } from './views/error/handler/error.handler';

const platform: any[] = [
  BrowserAnimationsModule,
  BrowserModule.withServerTransition({ appId: 'wooportal' }),
  HttpClientModule,
  TransferHttpCacheModule
];

@NgModule({
  bootstrap: [
    ClientComponent
  ],
  declarations: [
    ClientComponent
  ],
  imports: [
    ...platform,
    AppModule.forRoot(PackageJson),
    BaseModule,
    ClientRouter,
    CoreModule,
    ErrorModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ClientErrorHandler },
    { provide: MAT_MENU_SCROLL_STRATEGY, useValue: () => new ScrollStrategy() }
  ]
})

export class ClientModule {

  constructor(
    iconLibrary: FaIconLibrary
  ) {
    iconLibrary.addIconPacks(fab, fas);
  }

}
