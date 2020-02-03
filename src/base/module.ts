import { Injector, NgModule, Type } from '@angular/core';
import { ApplicationSettings } from '@wooportal/app';
import { BaseService, CrudModel, CrudProvider } from '@wooportal/core';
import { ApiConfiguration } from '../api/api-configuration';
import { ActivityProvider } from './providers/activity.provider';
import { AddressProvider } from './providers/address.provider';
import { BlogpostProvider } from './providers/blogpost.provider';
import { CategoryProvider } from './providers/category.provider';
import { ConfigurationProvider } from './providers/configuration.provider';
import { InfopageProvider } from './providers/infopage.provider';
import { KeywordProvider } from './providers/keyword.provider';
import { LanguageProvider } from './providers/language.provider';
import { MembershipProvider } from './providers/membership.provider';
import { OrganisationProvider } from './providers/organisation.provider';
import { SuburbProvider } from './providers/suburb.provider';
import { TargetGroupProvider } from './providers/target-group.provider';
import { TopicProvider } from './providers/topic.provider';
import { UserProvider } from './providers/user.provider';

const providers: Type<CrudProvider<BaseService, CrudModel>>[] = [
  ActivityProvider,
  AddressProvider,
  BlogpostProvider,
  CategoryProvider,
  ConfigurationProvider,
  InfopageProvider,
  KeywordProvider,
  LanguageProvider,
  MembershipProvider,
  OrganisationProvider,
  SuburbProvider,
  TargetGroupProvider,
  TopicProvider,
  UserProvider
];

@NgModule()

export class BaseModule {

  public constructor(
    api: ApiConfiguration,
    app: ApplicationSettings,
    injector: Injector
  ) {
    api.rootUrl = app.config.api.rootUrl;
    providers.forEach((provider) => injector.get(provider));
  }

}
