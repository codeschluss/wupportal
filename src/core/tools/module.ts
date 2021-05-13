import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassProvider, Injector, NgModule, TypeProvider } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiConfiguration } from '../../api/api-configuration';
import { TokenInterceptor } from '../auth/token.interceptor';
import { TokenProvider } from '../auth/token.provider';
import { LabelInterceptor } from '../labels/label.interceptor';
import { LoadingInterceptor } from '../loading/loading.interceptor';
import { PlatformInterceptor } from '../platform/platform.interceptor';
import { ActivityProvider } from '../providers/activity.provider';
import { AddressProvider } from '../providers/address.provider';
import { BlogpostProvider } from '../providers/blogpost.provider';
import { CategoryProvider } from '../providers/category.provider';
import { ConfigurationProvider } from '../providers/configuration.provider';
import { InfopageProvider } from '../providers/infopage.provider';
import { KeywordProvider } from '../providers/keyword.provider';
import { LabelProvider } from '../providers/label.provider';
import { LanguageProvider } from '../providers/language.provider';
import { MarkupProvider } from '../providers/markup.provider';
import { MembershipProvider } from '../providers/membership.provider';
import { OrganisationProvider } from '../providers/organisation.provider';
import { SubscriptionTypeProvider } from '../providers/subscription-type.provider';
import { SubscriptionProvider } from '../providers/subscription.provider';
import { SuburbProvider } from '../providers/suburb.provider';
import { TargetGroupProvider } from '../providers/target-group.provider';
import { TopicProvider } from '../providers/topic.provider';
import { UserProvider } from '../providers/user.provider';
import { VideoProvider } from '../providers/video.provider';
import { SessionProvider } from '../session/session.provider';
import { CoreSettings } from './settings';

const interceptors: ClassProvider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: LabelInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: PlatformInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];

const providers: TypeProvider[] = [
  ActivityProvider,
  AddressProvider,
  BlogpostProvider,
  CategoryProvider,
  ConfigurationProvider,
  InfopageProvider,
  KeywordProvider,
  LabelProvider,
  LanguageProvider,
  MarkupProvider,
  MembershipProvider,
  OrganisationProvider,
  SessionProvider,
  SubscriptionProvider,
  SubscriptionTypeProvider,
  SuburbProvider,
  TargetGroupProvider,
  TokenProvider,
  TopicProvider,
  UserProvider,
  VideoProvider
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    ...interceptors
  ]
})

export class CoreModule {

  public constructor(
    api: ApiConfiguration,
    injector: Injector,
    settings: CoreSettings
  ) {
    api.rootUrl = settings.api.rootUrl;
    providers.forEach((provider) => injector.get(provider));
  }

}
