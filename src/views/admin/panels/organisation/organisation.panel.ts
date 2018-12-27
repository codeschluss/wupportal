import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver, TokenResolver } from '@portal/core';
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
      organisations: CrudJoiner.of(OrganisationModel)
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
      .filter((organisation) => this.administered().includes(organisation.id));
  }

  public get providers(): ProviderModel[] {
    return this.route.snapshot.data.organisations
      .filter((organisation) => this.administered().includes(organisation.id))
      .flatMap((organisation) => this.providence(organisation))
      .filter((provider) => provider.approved);
  }

  public get requests(): ProviderModel[] {
    return this.route.snapshot.data.organisations
      .filter((organisation) => this.administered().includes(organisation.id))
      .flatMap((organisation) => this.providence(organisation))
      .filter((provider) => !provider.approved);
  }

  public grantAdmin(
    item: ProviderModel,
    grant: boolean
  ): void {
    const organisation = item.organisation as any;
    const user = item.user as any;

    organisation.constructor['provider']
      .grantOrganisationAdmin(organisation.id, user.id, grant)
      .subscribe();
  }

  public grantUser(
    item: ProviderModel,
    grant: boolean
  ): void {
    const organisation = item.organisation as any;
    const user = item.user as any;

    organisation.constructor['provider']
      .grantOrganisationUser(organisation.id, user.id, grant)
      .subscribe();
  }

  private administered(): string[] {
    const organisations = this.route.snapshot.data.organisations;
    const token = this.route.snapshot.data.tokens.access;

    return token[ClientPackage.config.jwtClaims.superUser]
      ? organisations.map((organisation) => organisation.id)
      : token[ClientPackage.config.jwtClaims.organisationAdmin];
  }

  private providence(organisation: OrganisationModel) {
    const users = organisation.users || [] as any;

    return users.map((user) => Object.assign(user.provider, {
      organisation: organisation,
      user: user
    }));
  }

}
