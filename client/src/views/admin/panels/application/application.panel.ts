import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver } from '@portal/core';
import { BaseTable } from '@portal/forms';
import { forkJoin } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { ConfigurationModel } from 'src/realm/configuration/configuration.model';
import { OrganisationModel } from '../../../../realm/organisation/organisation.model';
import { UserModel } from '../../../../realm/user/user.model';
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
      organisations: CrudResolver
    },
    data: {
      configuration: CrudJoiner.of(ConfigurationModel),
      organisations: CrudJoiner.of(OrganisationModel, { approved: false })
        .with('address').yield('suburb')
    }
  };

  public get configuration(): ConfigurationModel[] {
    return this.route.snapshot.data.configuration.reduce(
      (obj, conf) => Object.assign(obj, { [conf.item]: conf.value }), { });
  }

  public get requests(): OrganisationModel[] {
    return this.route.snapshot.data.organisations;
  }

  public approveOrganisation(
    table: BaseTable<CrudModel>,
    item: OrganisationModel
  ): void {
    item.constructor['provider']
      .grantOrganisation(item.id, true)
      .subscribe(() => table.remove(item));
  }

  public blockOrganisation(
    table: BaseTable<CrudModel>,
    item: OrganisationModel
  ): void {
    this.confirm(item).pipe(
      filter(Boolean),
      mergeMap(() => item.constructor['provider']
        .grantOrganisation(item.id, false))
    ).subscribe(() => table.remove(item));
  }

  public grantSuperUser(item: UserModel, grant: boolean): void {
    item.constructor['provider']
      .grantSuperUser(item.id, grant)
      .subscribe();
  }

  public persist(): void {
    forkJoin(
      Object.keys(this.group.controls)
        .filter((key) => this.group.get(key).dirty)
        .map((key) => Object.assign(this.route.snapshot.data.configuration
          .find((i) => i.item === key), { value: this.group.get(key).value }))
        .map((item) => this.route.routeConfig.data.persist(item))
    ).subscribe(() => this.group.markAsPristine());
  }

}
