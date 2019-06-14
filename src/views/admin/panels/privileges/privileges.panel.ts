import { Component } from '@angular/core';
import { Box, CrudJoiner, False, True } from '@wooportal/core';
import { filter, mergeMap } from 'rxjs/operators';
import { OrganisationModel } from '../../../../base/models/organisation.model';
import { UserModel } from '../../../../base/models/user.model';
import { BasePanel } from '../base.panel';

@Component({
  templateUrl: './privileges.panel.html'
})

export class PrivilegesPanelComponent extends BasePanel {

  protected path: string = 'privileges';

  protected resolve: object = {
    organisations: CrudJoiner.of(OrganisationModel, { approved: false })
      .with('address').yield('suburb'),
    users: CrudJoiner.of(UserModel)
      .with('blogger')
  };

  public get bloggers(): UserModel[] {
    return this.route.snapshot.data.users
      .filter((user) => user.blogger && !user.blogger.approved);
  }

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations || [];
  }

  public approve(item: OrganisationModel | UserModel): void {
    const provider = item.constructor['provider'];

    if (item instanceof OrganisationModel) {
      provider.grantOrganisation(item.id, True).subscribe(() => this.reload());
    } else if (item instanceof UserModel) {
      provider.grantBlogger(item.id, True).subscribe(() => this.reload());
    }
  }

  public block(item: OrganisationModel | UserModel): void {
    const provider = item.constructor['provider'];

    if (item instanceof OrganisationModel) {
      this.confirm(item).pipe(
        mergeMap(() => provider.grantOrganisation(item.id, False))
      ).subscribe(() => this.reload());
    } else if (item instanceof UserModel) {
      this.confirm(item).pipe(
        mergeMap(() => provider.grantBlogger(item.id, False))
      ).subscribe(() => this.reload());
    }

  }

  public demote(item: UserModel): void {
    const provider = UserModel['provider'];

    this.confirm(item).pipe(
      mergeMap(() => provider.unlinkBlogger(item.id))
    ).subscribe(() => this.reload());
  }

  public grant(item: UserModel, grant: boolean): void {
    const provider = UserModel['provider'];

    provider.grantSuperUser(item.id, Box(grant)).pipe(
      filter(() => item.id === this.userId)
    ).subscribe(() => this.reload());
  }

}
