import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    ErrorDialogComponent,
    I18nComponent,
    LoadingIndicatorComponent,
    SplashChildComponent,
    SplashHostComponent
  ],
  entryComponents: [
    ErrorDialogComponent,
    SplashChildComponent
  ],
  exports: [
    I18nComponent,
    LoadingIndicatorComponent,
    SplashHostComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    RouterModule
  ],
  providers: [
    { provide: CoreSettings, useClass: CoreSettings },
    { provide: ErrorHandler, useClass: CoreErrorHandler },
    { provide: SessionProvider, useClass: SessionProvider },
    { provide: TokenProvider, useClass: TokenProvider },
    { provide: UrlSerializer, useClass: CoreUrlSerializer },

    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: I18nInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})

export class CoreModule {

  public constructor(
    _sessionProvider: SessionProvider,
    _tokenProvider: TokenProvider
  ) { }

}
