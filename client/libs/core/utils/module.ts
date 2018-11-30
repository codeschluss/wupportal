import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { UrlSerializer } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TokenInterceptor } from '../auth/token.interceptor';
import { ErrorDialogComponent } from '../error/error.dialog';
import { CoreErrorHandler } from '../error/error.handler';
import { I18nComponent } from '../i18n/i18n.component';
import { I18nInterceptor } from '../i18n/i18n.interceptor';
import { CorePackage } from './package';
import { CoreUrlSerializer } from './serializer';
import { CoreSettings } from './settings';

@NgModule({
  providers: [
    { provide: CorePackage, useClass: CorePackage },
    { provide: CoreSettings, useClass: CoreSettings },
    { provide: ErrorHandler, useClass: CoreErrorHandler },
    { provide: UrlSerializer, useClass: CoreUrlSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: I18nInterceptor, multi: true }
  ],
  declarations: [ErrorDialogComponent, I18nComponent],
  entryComponents: [ErrorDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js')
  ],
  exports: [I18nComponent]
})

export class CoreModule { }
