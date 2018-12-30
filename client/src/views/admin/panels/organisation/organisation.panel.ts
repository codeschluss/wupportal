import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver, TokenResolver } from '@portal/core';
import { filter, mergeMap } from 'rxjs/operators';
import { ActivityModel } from '../../../../realm/activity/activity.model';
import { OrganisationModel } from '../../../../realm/organisation/organisation.model';
import { ProviderModel } from '../../../../realm/provider/provider.model';
import { UserModel } from '../../../../realm/user/user.model';
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

  public approveUser(item: ProviderModel): void {
    item.organisation.constructor['provider']
      .grantOrganisationUser(item.organisation.id, item.user.id, true)
      .subscribe(() => this.reload());
  }

  public blockUser(item: ProviderModel): void {
    this.confirm(Object.assign(item, {
      name: `${item.user.name} @ ${item.organisation.name}`
    })).pipe(
      filter(Boolean),
      mergeMap(() => item.organisation.constructor['provider']
        .grantOrganisationUser(item.organisation.id, item.user.id, false))
    ).subscribe(() => this.reload());
  }

  public demoteUser(item: ProviderModel): void {
    this.confirm(Object.assign(item, {
      name: `${item.user.name} @ ${item.organisation.name}`
    })).pipe(
      filter(Boolean),
      mergeMap(() => item.organisation.constructor['provider']
        .unlinkUser(item.organisation.id, item.user.id))
    ).subscribe(() => this.reload());
  }

  public grantAdmin(item: ProviderModel, grant: boolean): void {
    item.organisation.constructor['provider']
      .grantOrganisationAdmin(item.organisation.id, item.user.id, grant)
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
    const users = (organisation.users as UserModel[] || [])
      .filter((u) => u.id !== token[ClientPackage.config.jwtClaims.userId]);

    return users.map((user) => Object.assign(user.provider, {
      organisation: organisation,
      user: user
    }));
  }

}
