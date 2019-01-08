import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { Bool, CrudJoiner, CrudResolver, False, TokenResolver, True } from '@portal/core';
import { forkJoin } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { ConfigurationModel } from 'src/realm/configuration/configuration.model';
import { OrganisationModel } from '../../../../realm/organisation/organisation.model';
import { UserModel } from '../../../../realm/user/user.model';
import { ClientPackage } from '../../../../utils/package';
import { BasePanel } from '../base.panel';

@Component({
  templateUrl: './application.panel.html'
})

export class ApplicationPanelComponent extends BasePanel {

  public group: FormGroup = new FormGroup({ });

  protected routing: Route = {
    path: 'application',
    component: ApplicationPanelComponent,
    resolve: {
      configuration: CrudResolver,
      organisations: CrudResolver,
      tokens: TokenResolver
    },
    data: {
      configuration: CrudJoiner.of(ConfigurationModel),
      organisations: CrudJoiner.of(OrganisationModel, { approved: false })
        .with('address').yield('suburb')
    }
  };

  public get configuration(): { [kes: string]: string } {
    return this.route.snapshot.data.configuration.reduce((obj, conf) =>
      Object.assign(obj, { [conf.item]: conf.value }), { });
  }

  public get requests(): OrganisationModel[] {
    return this.route.snapshot.data.organisations;
  }

  public get userId(): string {
    const claim = ClientPackage.config.jwtClaims.userId;
    return this.route.snapshot.data.tokens.access[claim];
  }

  public approveOrganisation(item: OrganisationModel): void {
    item.constructor['provider']
      .grantOrganisation(item.id, True)
      .subscribe(() => this.reload());
  }

  public blockOrganisation(item: OrganisationModel): void {
    this.confirm(item).pipe(
      filter(Boolean),
      mergeMap(() => item.constructor['provider']
        .grantOrganisation(item.id, False))
    ).subscribe(() => this.reload());
  }

  public grantSuperUser(item: UserModel, grant: boolean): void {
    item.constructor['provider']
      .grantSuperUser(item.id, Bool(grant))
      .subscribe();
  }

  public persist(): void {
    forkJoin(
      Object.keys(this.group.controls)
        .filter((key) => this.group.get(key).dirty)
        .map((key) => Object.assign(this.route.snapshot.data.configuration
          .find((i) => i.item === key), { value: this.group.get(key).value }))
        .map((item) => this.route.routeConfig.data.form.persist(item))
    ).subscribe(() => this.group.markAsPristine());
  }

}
