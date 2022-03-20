import { Component } from '@angular/core';
import { ActivityModel, CrudJoiner, MembershipModel, OrganisationModel } from '../../../../core';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: 'organisation.panel.html'
})

export class OrganisationPanelComponent
  extends BasePanel {

  protected path: string = 'organisation';

  protected resolve: Record<string, CrudJoiner> = {
    organisations: CrudJoiner.of(OrganisationModel, {
      approved: true
    }).with('activities').yield('address').yield('suburb')
      .with('activities').yield('category')
      .with('activities').yield('provider').yield('organisation')
      .with('address').yield('suburb')
      // .with('providers').yield('activities').yield('address').yield('suburb')
      // .with('providers').yield('activities').yield('category')
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

  public activityVisits(item: ActivityModel): number {
    return item?.visitors?.length 
      ? item.visitors.map(v => v.visits).reduce((prev, curr) => prev + curr, 0) 
      : 0;
  }

  public activityVisitors(item: ActivityModel): number {
    return item?.visitors?.length
      ? item.visitors.length
      : 0;
  }

  public orgaVisits(item: OrganisationModel): number {
    return item?.visitors?.length
      ? item.visitors.map(v => v.visits).reduce((prev, curr) => prev + curr, 0)
      : 0;
  }

  public orgaVisitors(item: OrganisationModel): number {
    return item?.visitors?.length
      ? item.visitors.length
      : 0;
  }

}
