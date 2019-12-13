import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudJoiner } from '@wooportal/core';
import { filter } from 'rxjs/operators';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { BlogpostModel } from '../../../../realm/models/blogpost.model';
import { OrganisationModel } from '../../../../realm/models/organisation.model';
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
    user: CrudJoiner.of(UserModel, {
      required: true
    }).with('activities').yield('address').yield('suburb')
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

  public get approved(): boolean {
    return this.organisations.some((item) => item.approved);
  }

  public get blogger(): boolean {
    return this.user.blogger && this.user.blogger.approved;
  }

  public get blogposts(): BlogpostModel[] {
    return this.user.blogposts || [];
  }

  public get organisations(): OrganisationModel[] {
    return this.user.organisations || [];
  }

  public get name(): string {
    return this.group.get('name') ? this.group.get('name').value : '...';
  }

  public get user(): UserModel {
    return this.route.snapshot.data.user || { };
  }

  public joinBloggers(): void {
    this.userProvider.linkBlogger().subscribe(() => this.reload());
  }

  public joinOrganisations(): void {
    this.dialog.open(RequestDialogComponent, {
      data: this.user
    }).afterClosed().pipe(filter(Boolean)).subscribe(() => this.reload());
  }

}
