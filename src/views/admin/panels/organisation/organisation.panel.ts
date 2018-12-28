import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, TokenResolver } from '@portal/core';
import { BaseTable } from '@portal/forms';
import { filter, mergeMap } from 'rxjs/operators';
import { ActivityModel } from '../../../../realm/activity/activity.model';
import { OrganisationModel } from '../../../../realm/organisation/organisation.model';
import { ProviderModel } from '../../../../realm/provider/provider.model';
import { ClientPackage } from '../../../../utils/package';
import { BasePanel } from '../base.panel';

@Component({
  templateUrl: './organisation.panel.html'
})

export class OrganisationPanelComponent extends BasePanel {

  protected routing: Route = {
    path: 'organisation',
    component: OrganisationPanelComponent,
    resolve: {
      organisations: CrudResolver,
      tokens: TokenResolver
    },
    data: {
      organisations: CrudJoiner.of(OrganisationModel, { approved: true })
        .with('activities').yield('category')
        .with('activities').yield('provider').yield('organisation')
        .with('address').yield('suburb')
        .with('users').yield('provider')
    }
  };

  public get activities(): ActivityModel[] {
    return this.organisations.reduce(
      (a, organisation) => a.concat(...[organisation.activities || []]), []);
  }

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations
      .filter((organisation) => this.owned().includes(organisation.id));
  }

  public get providers(): ProviderModel[] {
    return this.route.snapshot.data.organisations
      .filter((organisation) => this.owned().includes(organisation.id))
      .flatMap((organisation) => this.provided(organisation))
      .filter((provider) => provider.approved);
  }

  public get requests(): ProviderModel[] {
    return this.route.snapshot.data.organisations
      .filter((organisation) => this.owned().includes(organisation.id))
      .flatMap((organisation) => this.provided(organisation))
      .filter((provider) => !provider.approved);
  }

  public approveUser(table: BaseTable<CrudModel>, item: ProviderModel): void {
    const organisation = item.organisation as any;
    const user = item.user as any;

    organisation.constructor['provider']
      .grantOrganisationUser(organisation.id, user.id, true)
      .subscribe(() => table.remove(item));
  }

  public blockUser(table: BaseTable<CrudModel>, item: ProviderModel): void {
    const organisation = item.organisation as any;
    const user = item.user as any;
    Object.assign(item, { name: `${user.name} @ ${organisation.name}` });

    this.confirm(item).pipe(
      filter(Boolean),
      mergeMap(() => organisation.constructor['provider']
        .grantOrganisationUser(organisation.id, user.id, false))
    ).subscribe(() => table.remove(item));
  }

  public demoteUser(table: BaseTable<CrudModel>, item: ProviderModel): void {
    const organisation = item.organisation as any;
    const user = item.user as any;
    Object.assign(item, { name: `${user.name} @ ${organisation.name}` });

    this.confirm(item).pipe(
      filter(Boolean),
      mergeMap(() => organisation.constructor['provider']
        .unlinkUser(organisation.id, user.id))
    ).subscribe(() => table.remove(item));
  }

  public grantAdmin(item: ProviderModel, grant: boolean): void {
    const organisation = item.organisation as any;
    const user = item.user as any;

    organisation.constructor['provider']
      .grantOrganisationAdmin(organisation.id, user.id, grant)
      .subscribe();
  }

  private owned(): string[] {
    const organisations = this.route.snapshot.data.organisations;
    const token = this.route.snapshot.data.tokens.access;

    return token[ClientPackage.config.jwtClaims.superUser]
      ? organisations.map((organisation) => organisation.id)
      : token[ClientPackage.config.jwtClaims.organisationAdmin];
  }

  private provided(organisation: OrganisationModel) {
    const token = this.route.snapshot.data.tokens.access;
    const users = (organisation.users || [] as any)
      .filter((u) => u.id !== token[ClientPackage.config.jwtClaims.userId]);

    return users.map((user) => Object.assign(user.provider, {
      organisation: organisation,
      user: user
    }));
  }

}
