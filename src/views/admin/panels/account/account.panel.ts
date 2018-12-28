import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, TokenResolver } from '@portal/core';
import { BaseTable } from '@portal/forms';
import { filter, mergeMap } from 'rxjs/operators';
import { OrganisationModel } from '../../../../realm/organisation/organisation.model';
import { UserModel } from '../../../../realm/user/user.model';
import { ClientPackage } from '../../../../utils/package';
import { BasePanel } from '../base.panel';

@Component({
  templateUrl: './account.panel.html'
})

export class AccountPanelComponent extends BasePanel {

  public group: FormGroup = new FormGroup({ });

  protected routing: Route = {
    path: 'account/:uuid',
    component: AccountPanelComponent,
    resolve: {
      tokens: TokenResolver,
      user: CrudResolver
    },
    data: {
      user: CrudJoiner.of(UserModel)
        .with('activities').yield('category')
        .with('activities').yield('provider').yield('organisation')
        .with('organisations').yield('address').yield('suburb')
    }
  };

  public get user(): UserModel {
    return this.route.snapshot.data.user;
  }

  public admin(item: OrganisationModel): boolean {
    const claim = ClientPackage.config.jwtClaims.organisationAdmin;
    return this.route.snapshot.data.tokens.access[claim].includes(item.id);
  }

  public approved(item: OrganisationModel): boolean {
    const claim = ClientPackage.config.jwtClaims.organisationUser;
    return this.route.snapshot.data.tokens.access[claim].includes(item.id);
  }

  public demoteUser(
    table: BaseTable<CrudModel>,
    item: OrganisationModel
  ): void {
    this.confirm(item).pipe(
      filter(Boolean),
      mergeMap(() => this.user.constructor['provider']
        .unlinkOrganisation(this.user.id, item.id))
    ).subscribe(() => table.remove(item));
  }

  public persist(): void {
    this.route.routeConfig.data.persist()
      .subscribe(() => this.group.markAsPristine());
  }

}
