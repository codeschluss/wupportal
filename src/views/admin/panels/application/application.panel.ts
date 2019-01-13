import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Box, CrudJoiner, False, True } from '@portal/core';
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

  protected path: string = 'application';

  protected resolve: object = {
    configuration: CrudJoiner.of(ConfigurationModel),
    organisations: CrudJoiner.of(OrganisationModel, { approved: false })
      .with('address').yield('suburb'),
    users: CrudJoiner.of(UserModel)
      .with('blogger')
  };

  public get bloggers(): UserModel[] {
    return this.route.snapshot.data.users
      .filter((user) => user.blogger && !user.blogger.approved);
  }

  public get configuration(): ConfigurationModel[] {
    return this.route.snapshot.data.configuration || [];
  }

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations || [];
  }

  public get title(): string {
    const title = this.configuration.find((c) => c.item === 'portalName');
    const sub = this.configuration.find((c) => c.item === 'portalSubtitle');

    return `${title ? title.value : '...'} - ${sub ? sub.value : '...'}`;
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
