import { Injector, NgModule, Type } from '@angular/core';
import { BaseService, CoreModule, CrudModel, CrudProvider } from '@wooportal/core';
import { ApiConfiguration } from '../api/api-configuration';
import { ClientManifest } from '../utils/manifest';
import { ClientPackage } from '../utils/package';
import { ActivityProvider } from './providers/activity.provider';
import { AddressProvider } from './providers/address.provider';
import { BlogProvider } from './providers/blog.provider';
import { CategoryProvider } from './providers/category.provider';
import { ConfigurationProvider } from './providers/configuration.provider';
import { LanguageProvider } from './providers/language.provider';
import { OrganisationProvider } from './providers/organisation.provider';
import { PageProvider } from './providers/page.provider';
import { ProviderProvider } from './providers/provider.provider';
import { SuburbProvider } from './providers/suburb.provider';
import { TagProvider } from './providers/tag.provider';
import { TargetGroupProvider } from './providers/target-group.provider';
import { TopicProvider } from './providers/topic.provider';
import { UserProvider } from './providers/user.provider';

const providers: Type<CrudProvider<BaseService, CrudModel>>[] = [
  ActivityProvider,
  AddressProvider,
  BlogProvider,
  CategoryProvider,
  ConfigurationProvider,
  LanguageProvider,
  OrganisationProvider,
  PageProvider,
  ProviderProvider,
  SuburbProvider,
  TagProvider,
  TargetGroupProvider,
  TopicProvider,
  UserProvider
];

@NgModule({
  exports: [CoreModule],
  imports: [CoreModule.forRoot({
    apiAuthUrl: ClientPackage.config.api.authUrl,
    apiRefreshUrl: ClientPackage.config.api.refreshUrl,
    apiRootUrl: ClientPackage.config.api.rootUrl,
    appRootUrl: ClientManifest.startUrl,
    appTitle: ClientManifest.shortTitle
  })]
})

export class BaseModule {

  public constructor(
    apiConfiguration: ApiConfiguration,
    injector: Injector
  ) {
    apiConfiguration.rootUrl = ClientPackage.config.api.rootUrl;
    providers.forEach((provider) => injector.get(provider));
  }

}
