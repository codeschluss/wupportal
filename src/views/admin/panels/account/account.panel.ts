import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivityModel, BlogpostModel, CrudJoiner, ImageModel, OrganisationModel, UserModel } from '../../../../core';
import { BasePanel } from '../../base/base.panel';
import { RequestPopupComponent } from '../../popups/request.popup';

@Component({
  templateUrl: 'account.panel.html'
})

export class AccountPanelComponent
  extends BasePanel {

  public avatarGroup: FormGroup = new FormGroup({ });
  public userGroup: FormGroup = new FormGroup({ });

  protected path: string = 'account/:uuid';

  protected resolve: Record<string, CrudJoiner> = {
    user: CrudJoiner.of(UserModel, {
      required: true
    }).with('activities').yield('address').yield('suburb')
      .with('activities').yield('category')
      .with('activities').yield('provider').yield('organisation')
      .with('blogger')
      .with('blogs').yield('activity')
      .with('organisations').yield('address').yield('suburb')
      .with('organisations').yield('provider')
      .with('avatar')
  };

  public get activities(): ActivityModel[] {
    return this.user.activities || [];
  }


  public get avatar(): ImageModel {
    return this.user.avatar;
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
    return this.userGroup.get('name')
      ? this.userGroup.get('name').value
      : '...';
  }

  public get user(): UserModel {
    return this.route.snapshot.data.user || { };
  }

  public joinBloggers(): void {
    this.userProvider.linkBlogger().subscribe(() => this.reload());
  }

  public joinOrganisations(): void {
    this.dialog.open(RequestPopupComponent, {
      data: this.user
    }).afterClosed().pipe(filter(Boolean)).subscribe(() => this.reload());
  }

  public persistAvatar(): Observable<any> {
    return this.userProvider.addAvatar(this.user.id, this.avatarGroup.get('avatar').value);
  }

}
