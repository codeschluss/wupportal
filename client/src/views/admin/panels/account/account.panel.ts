import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudJoiner } from '@portal/core';
import { filter, mergeMap } from 'rxjs/operators';
import { ActivityModel } from '../../../../realm/activity/activity.model';
import { OrganisationModel } from '../../../../realm/organisation/organisation.model';
import { UserModel } from '../../../../realm/user/user.model';
import { RequestDialogComponent } from '../../dialogs/request.dialog';
import { BasePanel } from '../base.panel';

@Component({
  templateUrl: './account.panel.html'
})

export class AccountPanelComponent extends BasePanel {

  public group: FormGroup = new FormGroup({ });

  protected path: string = 'account/:uuid';

  protected resolve: object = {
    user: CrudJoiner.of(UserModel)
      .with('activities').yield('address').yield('suburb')
      .with('activities').yield('category')
      .with('activities').yield('provider').yield('organisation')
      .with('organisations').yield('address').yield('suburb')
  };

  public get activities(): ActivityModel[] {
    return this.user.activities || [];
  }

  public get organisations(): OrganisationModel[] {
    return this.user.organisations || [];
  }

  public get provides(): boolean {
    return this.organisations.some((item) => item.approved);
  }

  public get user(): UserModel {
    return this.route.snapshot.data.user || { };
  }

  public approved(item: OrganisationModel): boolean {
    return this.organisationUser.includes(item.id);
  }

  public admin(item: OrganisationModel): boolean {
    return this.organisationAdmin.includes(item.id);
  }

  // TODO: get provider
  public demote(item: OrganisationModel): void {
    const provider = UserModel['provider'];

    this.confirm(item).pipe(
      mergeMap(() => provider.unlinkOrganisation(this.userId, item.id))
    ).subscribe(() => this.reload());
  }

  public request(): void {
    this.dialog.open(RequestDialogComponent).afterClosed()
      .pipe(filter(Boolean)).subscribe(() => this.reload());
  }

}
