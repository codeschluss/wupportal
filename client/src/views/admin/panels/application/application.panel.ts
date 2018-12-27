import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver } from '@portal/core';
import { forkJoin } from 'rxjs';
import { ConfigurationModel } from 'src/realm/configuration/configuration.model';
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
      configuration: CrudResolver
    },
    data: {
      configuration: CrudJoiner.of(ConfigurationModel)
    }
  };

  public get configuration(): ConfigurationModel[] {
    return this.route.snapshot.data.configuration.reduce(
      (obj, conf) => Object.assign(obj, { [conf.item]: conf.value }), { });
  }

  public grantSuperUser(
    item: UserModel,
    grant: boolean
  ): void {
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
    ).subscribe(/* TODO: Event handling */);
  }

}
