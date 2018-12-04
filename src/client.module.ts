import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule, CoreSettings } from '@portal/core';
import { ApiConfiguration } from './api/api-configuration';
import { ApiModule } from './api/api.module';
import { ClientComponent } from './client.component';
import { ClientRouter } from './client.router';
import { ActivityProvider } from './realm/activity/activity.provider';
import { AddressProvider } from './realm/address/address.provider';
import { CategoryProvider } from './realm/category/category.provider';
import { ConfigurationProvider } from './realm/configuration/configuration.provider';
import { OrganisationProvider } from './realm/organisation/organisation.provider';
import { SuburbProvider } from './realm/suburb/suburb.provider';
import { TagProvider } from './realm/tag/tag.provider';
import { TargetGroupProvider } from './realm/target-group/target-group.provider';
import { UserProvider } from './realm/user/user.provider';
import { ClientPackage } from './utils/package';
import { LayoutComponent } from './views/layout/layout.component';

@NgModule({
  bootstrap: [ClientComponent],
  declarations: [ClientComponent],
  imports: [
    // TODO: move
    LayoutComponent.imports,

    ApiModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClientRouter,
    CoreModule,
    HttpClientModule,
  ],
  providers: [
    ActivityProvider,
    AddressProvider,
    CategoryProvider,
    ConfigurationProvider,
    OrganisationProvider,
    SuburbProvider,
    TagProvider,
    TargetGroupProvider,
    UserProvider
  ]
})

export class ClientModule {

  public constructor(
    apiConfiguration: ApiConfiguration,
    clientPackage: ClientPackage,
    coreSettings: CoreSettings,

    _activityProvider: ActivityProvider,
    _addressProvider: AddressProvider,
    _categoryProvider: CategoryProvider,
    _configurationProvider: ConfigurationProvider,
    _organisationProvider: OrganisationProvider,
    _suburbProvider: SuburbProvider,
    _tagProvider: TagProvider,
    _targetGroupProvider: TargetGroupProvider,
    _userProvider: UserProvider
  ) {
    apiConfiguration.rootUrl = clientPackage.config.api.rootUrl;
    coreSettings.authUrl = clientPackage.config.api.authUrl;
    coreSettings.refreshUrl = clientPackage.config.api.refreshUrl;
  }

}
