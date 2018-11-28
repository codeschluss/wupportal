import { Component } from '@angular/core';
import { ApiConfiguration } from './core/api/api-configuration';
import { ActivityProvider } from './core/providers/activity.provider';
import { AddressProvider } from './core/providers/address.provider';
import { CategoryProvider } from './core/providers/category.provider';
import { ConfigurationProvider } from './core/providers/configuration.provider';
import { OrganisationProvider } from './core/providers/organisation.provider';
import { SuburbProvider } from './core/providers/suburb.provider';
import { TagProvider } from './core/providers/tag.provider';
import { TargetGroupProvider } from './core/providers/target-group.provider';
import { UserProvider } from './core/providers/user.provider';
import { ClientPackage } from './core/utils/package';

@Component({
  selector: 'client-component',
  template: `<router-outlet></router-outlet>`
})

export class ClientComponent {

  public constructor(
    apiConfiguration: ApiConfiguration,
    clientPackage: ClientPackage,

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
  }

}
