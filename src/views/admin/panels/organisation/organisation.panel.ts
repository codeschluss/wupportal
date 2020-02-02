import { Component } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { ActivityModel } from '../../../../base/models/activity.model';
import { MembershipModel } from '../../../../base/models/membership.model';
import { OrganisationModel } from '../../../../base/models/organisation.model';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: './organisation.panel.html'
})

export class OrganisationPanelComponent extends BasePanel {

  protected path: string = 'organisation';

  protected resolve: object = {
    organisations: CrudJoiner.of(OrganisationModel, {
      approved: true
    }).with('activities').yield('address').yield('suburb')
      .with('activities').yield('category')
      .with('activities').yield('provider').yield('organisation')
      .with('address').yield('suburb')
      .with('users').yield('provider')
  };

  public get activities(): ActivityModel[] {
    return this.organisations.reduce((arr, organisation) =>
      arr.concat(organisation.activities || []), []);
  }

  public get memberships(): MembershipModel[] {
    return this.organisations
      .flatMap((organisation) => this.membership(organisation))
      .filter((membership) => membership.approved);
  }

  public get organisations(): OrganisationModel[] {
    return (this.route.snapshot.data.organisations || []).filter((item) =>
      this.superUser || this.organisationAdmin.includes(item.id));
  }

  public get requests(): MembershipModel[] {
    return this.organisations
      .flatMap((organisation) => this.membership(organisation))
      .filter((membership) => !membership.approved);
  }

}
