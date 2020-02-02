import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassProvider, Injector, NgModule, Provider, TRANSLATIONS, TRANSLATIONS_FORMAT, TypeProvider } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { AppCommonModule, AppRouterModule } from '@wooportal/app';
import { TokenInterceptor } from '../auth/token.interceptor';
import { TokenProvider } from '../auth/token.provider';
import { LabelsInterceptor } from '../labels/labels.interceptor';
import { LabelsFactory, LabelsResolver } from '../labels/labels.resolver';
import { LoadingInterceptor } from '../loading/loading.interceptor';
import { SessionProvider } from '../session/session.provider';
import { CoreUrlSerializer } from './serializer';

const interceptors: ClassProvider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: LabelsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];

const internationalization: Provider[] = [
  { provide: I18n, useClass: I18n },
  { provide: TRANSLATIONS, useFactory: LabelsFactory, deps: [LabelsResolver] },
  { provide: TRANSLATIONS_FORMAT, useValue: 'xliff' }
];

const providers: TypeProvider[] = [
  SessionProvider,
  TokenProvider
];

@NgModule({
  imports: [
    AppCommonModule,
    AppRouterModule
  ],
  providers: [
    ...interceptors,
    ...internationalization,
    { provide: UrlSerializer, useClass: CoreUrlSerializer }
  ]
})

export class CoreModule {

  public constructor(
    injector: Injector
  ) {
    providers.forEach((provider) => injector.get(provider));
  }

}
