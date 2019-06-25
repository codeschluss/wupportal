import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Injector, NgModule, Provider, Type } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UrlSerializer } from '@angular/router';
import { TokenInterceptor } from '../auth/token.interceptor';
import { TokenProvider } from '../auth/token.provider';
import { I18nComponent } from '../i18n/i18n.component';
import { I18nInterceptor } from '../i18n/i18n.interceptor';
import { LoadingIndicatorComponent } from '../loading/loading.indicator';
import { LoadingInterceptor } from '../loading/loading.interceptor';
import { PlatformInterceptor } from '../platform/platform.interceptor';
import { PlatformCommonModule, PlatformRouterModule } from '../platform/platform.modules';
import { SessionProvider } from '../session/session.provider';
import { CoreUrlSerializer } from './serializer';
import { CoreSettings } from './settings';

const declarations: Type<any>[] = [
  I18nComponent,
  LoadingIndicatorComponent
];

const providers: Provider[] = [
  SessionProvider,
  TokenProvider
];

@NgModule({
  declarations: [
    ...declarations
  ],
  exports: [
    ...declarations
  ],
  imports: [
    MatProgressBarModule,
    PlatformCommonModule,
    PlatformRouterModule
  ],
  providers: [
    { provide: UrlSerializer, useClass: CoreUrlSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: I18nInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: PlatformInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})

export class CoreModule {

  static forRoot(settings: CoreSettings): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{ provide: CoreSettings, useValue: settings }]
    };
  }

  public constructor(
    injector: Injector
  ) {
    providers.forEach((provider) => injector.get(provider as Type<any>));
  }

}
