import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Injector, NgModule, Provider, TRANSLATIONS, TRANSLATIONS_FORMAT, Type } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { TokenInterceptor } from '../auth/token.interceptor';
import { TokenProvider } from '../auth/token.provider';
import { I18nComponent } from '../i18n/i18n.component';
import { I18nInterceptor } from '../i18n/i18n.interceptor';
import { I18nResolver, TRANSLATIONS_FACTORY } from '../i18n/i18n.resolver';
import { LoadingInterceptor } from '../loading/loading.interceptor';
import { PlatformInterceptor } from '../platform/platform.interceptor';
import { PlatformCommonModule, PlatformRouterModule } from '../platform/platform.modules';
import { PlatformProvider } from '../platform/platform.provider';
import { SessionProvider } from '../session/session.provider';
import { CoreUrlSerializer } from './serializer';
import { CoreSettings } from './settings';

const declarations: Type<any>[] = [
  I18nComponent
];

const i18n: Provider[] = [
  {
    provide: I18n,
    useClass: I18n
  },
  {
    deps: [I18nResolver],
    provide: TRANSLATIONS,
    useFactory: TRANSLATIONS_FACTORY
  },
  {
    provide: TRANSLATIONS_FORMAT,
    useValue: 'xliff'
  }
];

const interceptors: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: I18nInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: PlatformInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];

const providers: Provider[] = [
  PlatformProvider,
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
    PlatformCommonModule,
    PlatformRouterModule
  ],
  providers: [
    ...i18n,
    ...interceptors,
    { provide: UrlSerializer, useClass: CoreUrlSerializer }
  ]
})

export class CoreModule {

  public static forRoot(settings: CoreSettings): ModuleWithProviders {
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
