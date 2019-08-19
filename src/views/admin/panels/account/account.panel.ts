import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudJoiner } from '@wooportal/core';
import { filter, mergeMap } from 'rxjs/operators';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { BlogModel } from '../../../../realm/models/blog.model';
import { OrganisationModel } from '../../../../realm/models/organisation.model';
import { ProviderModel } from '../../../../realm/models/provider.model';
import { UserModel } from '../../../../realm/models/user.model';
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
      .with('blogger')
      .with('blogs').yield('activity')
      .with('organisations').yield('address').yield('suburb')
      .with('organisations').yield('provider')
  };

  public get activities(): ActivityModel[] {
    return this.user.activities || [];
  }

  public get blogger(): boolean {
    return this.user.blogger && this.user.blogger.approved;
  }

  public get blogs(): BlogModel[] {
    return this.user.blogs || [];
  }

  public get organisations(): OrganisationModel[] {
    return this.user.organisations || [];
  }

  public get provides(): boolean {
    return this.organisations.some((item) => item.approved);
  }

  public get name(): string {
    return this.group.get('name') ? this.group.get('name').value : '...';
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

  public demote(item: OrganisationModel): void {
    const provider = UserModel['provider'];

    this.confirm(this.provided(item)).pipe(
      mergeMap(() => provider.unlinkOrganisation(this.userId, item.id))
    ).subscribe(() => this.reload());
  }

  public joinBloggers(): void {
    this.userProvider.linkBlogger().subscribe(() => this.reload());
  }

  public joinOrganisations(): void {
    this.dialog.open(RequestDialogComponent).afterClosed()
      .pipe(filter(Boolean)).subscribe(() => this.reload());
  }

  private provided(item: OrganisationModel): ProviderModel {
    return Object.assign(item.provider, {
      organisation: item,
      user: this.user
    });
  }

}
