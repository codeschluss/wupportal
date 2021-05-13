import { Component } from '@angular/core';
import { CrudJoiner, MembershipModel, OrganisationModel, UserModel } from '../../../../core';
import { BasePanel } from '../../base/base.panel';

@Component({
  templateUrl: 'privileges.panel.html'
})

export class PrivilegesPanelComponent
  extends BasePanel {

  protected path: string = 'privileges';

  protected resolve: Record<string, CrudJoiner> = {
    memberships: CrudJoiner.of(OrganisationModel, {
      approved: true
    }).with('users').yield('provider'),
    organisations: CrudJoiner.of(OrganisationModel, {
      approved: false
    }).with('address').yield('suburb'),
    users: CrudJoiner.of(UserModel)
      .with('blogger')
  };

  public get bloggers(): UserModel[] {
    return (this.route.snapshot.data.users || [])
      .filter((user) => user.blogger && !user.blogger.approved);
  }

  public get memberships(): MembershipModel[] {
    return (this.route.snapshot.data.memberships || [])
      .flatMap((organisation) => this.membership(organisation))
      .filter((membership) => !membership.approved);
  }

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations || [];
  }

  public resetAllPasswords(): void {
    this.userProvider.resetAllPasswords().subscribe();
  }

}
