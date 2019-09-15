import { Component } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { OrganisationModel } from '../../../../realm/models/organisation.model';
import { ProviderModel } from '../../../../realm/models/provider.model';
import { UserModel } from '../../../../realm/models/user.model';
import { BasePanel } from '../base.panel';

@Component({
  templateUrl: './privileges.panel.html'
})

export class PrivilegesPanelComponent extends BasePanel {

  protected path: string = 'privileges';

  protected resolve: object = {
    organisations: CrudJoiner.of(OrganisationModel, { approved: false })
      .with('address').yield('suburb'),
    providers: CrudJoiner.of(OrganisationModel, { approved: true })
      .with('users').yield('provider'),
    users: CrudJoiner.of(UserModel)
      .with('blogger')
  };

  public get bloggers(): UserModel[] {
    return this.route.snapshot.data.users
      .filter((user) => user.blogger && !user.blogger.approved);
  }

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations || [];
  }

  public get providers(): ProviderModel[] {
    return this.route.snapshot.data.providers.flatMap((i) => this.provided(i))
      .filter((provider) => !provider.approved);
  }

}
