import { Component } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { OrganisationModel } from '../../../../realm/models/organisation.model';
import { ProviderModel } from '../../../../realm/models/provider.model';
import { BasePanel } from '../base.panel';

@Component({
  templateUrl: './organisation.panel.html'
})

export class OrganisationPanelComponent extends BasePanel {

  protected path: string = 'organisation';

  protected resolve: object = {
    organisations: CrudJoiner.of(OrganisationModel, { approved: true })
      .with('activities').yield('address').yield('suburb')
      .with('activities').yield('category')
      .with('activities').yield('provider').yield('organisation')
      .with('address').yield('suburb')
      .with('users').yield('provider')
  };

  public get activities(): ActivityModel[] {
    return this.organisations.reduce((arr, organisation) =>
      arr.concat(organisation.activities || []), []);
  }

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations.filter((organisation) =>
      this.superUser || this.organisationAdmin.includes(organisation.id));
  }

  public get providers(): ProviderModel[] {
    return this.organisations.flatMap((i) => this.provided(i))
      .filter((provider) => provider.approved);
  }

  public get requests(): ProviderModel[] {
    return this.organisations.flatMap((i) => this.provided(i))
      .filter((provider) => !provider.approved);
  }

}
