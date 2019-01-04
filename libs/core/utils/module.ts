import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, Injector, NgModule, Provider, Type } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatProgressBarModule } from '@angular/material';
import { RouterModule, UrlSerializer } from '@angular/router';
import { TokenInterceptor } from '../auth/token.interceptor';
import { TokenProvider } from '../auth/token.provider';
import { ErrorDialogComponent } from '../error/error.dialog';
import { CoreErrorHandler } from '../error/error.handler';
import { I18nComponent } from '../i18n/i18n.component';
import { I18nInterceptor } from '../i18n/i18n.interceptor';
import { LoadingIndicatorComponent } from '../loading/loading.indicator';
import { LoadingInterceptor } from '../loading/loading.interceptor';
import { SessionProvider } from '../session/session.provider';
import { ApiInterceptor } from './api';
import { CoreUrlSerializer } from './serializer';
import { CoreSettings } from './settings';
import { SplashChildComponent, SplashHostComponent } from './splash';

const declarations: Type<any>[] = [
  I18nComponent,
  LoadingIndicatorComponent,
  SplashHostComponent
];

const dialogs: Type<any>[] = [
  ErrorDialogComponent,
  SplashChildComponent
];

const materials: Type<any>[] = [
  MatButtonModule,
  MatDialogModule,
  MatProgressBarModule
];

const providers: Provider[] = [
  CoreSettings,
  SessionProvider,
  TokenProvider
];

@NgModule({
  declarations: [
    ...declarations,
    ...dialogs
  ],
  entryComponents: [
    ...dialogs
  ],
  exports: [
    ...declarations
  ],
  imports: [
    ...materials,
    CommonModule,
    RouterModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: CoreErrorHandler },
    { provide: UrlSerializer, useClass: CoreUrlSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: I18nInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})

export class CoreModule {

  public constructor(
    injector: Injector
  ) {
    providers.forEach((provider) => injector.get(provider));
  }

}
