import { Component } from '@angular/core';
import { Box, CrudJoiner, False, True } from '@portal/core';
import { filter, mergeMap } from 'rxjs/operators';
import { ActivityModel } from '../../../../realm/activity/activity.model';
import { OrganisationModel } from '../../../../realm/organisation/organisation.model';
import { ProviderModel } from '../../../../realm/provider/provider.model';
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
    return this.organisations
      .flatMap((organisation) => this.provided(organisation))
      .filter((provider) => provider.approved);
  }

  public get requests(): ProviderModel[] {
    return this.organisations
      .flatMap((organisation) => this.provided(organisation))
      .filter((provider) => !provider.approved);
  }

  public approve(item: ProviderModel): void {
    const provider = OrganisationModel['provider'];
    const orgaId = item.organisation.id;
    const userId = item.user.id;

    provider.grantOrganisationUser(orgaId, userId, True)
      .subscribe(() => this.reload());
  }

  public block(item: ProviderModel): void {
    const provider = OrganisationModel['provider'];
    const orgaId = item.organisation.id;
    const userId = item.user.id;

    this.confirm(item).pipe(
      mergeMap(() => provider.grantOrganisationUser(orgaId, userId, False))
    ).subscribe(() => this.reload());
  }

  public demote(item: ProviderModel): void {
    const provider = OrganisationModel['provider'];
    const orgaId = item.organisation.id;
    const userId = item.user.id;

    this.confirm(item).pipe(
      mergeMap(() => provider.unlinkUser(orgaId, userId))
    ).subscribe(() => this.reload());
  }

  public grant(item: ProviderModel, grant: boolean): void {
    const provider = OrganisationModel['provider'];
    const orgaId = item.organisation.id;
    const userId = item.user.id;

    provider.grantOrganisationAdmin(orgaId, userId, Box(grant)).pipe(
      filter(() => userId === this.userId)
    ).subscribe(() => this.reload());
  }

  private provided(organisation: OrganisationModel): ProviderModel[] {
    const users = organisation.users as any || [];

    return users.map((user) => Object.assign(user.provider, {
      organisation: organisation,
      user: user
    }));
  }

}
