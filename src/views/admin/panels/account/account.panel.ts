import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { ActivityModel, BlogpostModel, CrudJoiner, ImageModel, OrganisationModel, UserModel } from '../../../../core';
import { BasePanel } from '../../base/base.panel';
import { RequestPopupComponent } from '../../popups/request.popup';

@Component({
  templateUrl: 'account.panel.html'
})

export class AccountPanelComponent
  extends BasePanel {

  public userGroup: FormGroup = new FormGroup({ });

  protected path: string = 'account/:uuid';

  protected resolve: Record<string, CrudJoiner> = {
    user: CrudJoiner.of(UserModel, {
      required: true
    }).with('activities').yield('address').yield('suburb')
      .with('activities').yield('category')
      .with('activities').yield('provider').yield('organisation')
      .with('activities').yield('visitors')
      .with('avatar')
      .with('blogger')
      .with('blogs').yield('visitors')
      .with('organisations').yield('address').yield('suburb')
      .with('organisations').yield('provider')
      .with('organisations').yield('visitors')
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

  public activityVisits(item: ActivityModel): number {
    return item?.visitors?.length 
      ? item.visitors.map(v => v.visits).reduce((prev, curr) => prev + curr, 0) 
      : 0;
  }

  public activityVisitors(item: ActivityModel): number {
    return item?.visitors?.length
      ? item.visitors.length
      : 0;
  }

  public blogVisits(item: BlogpostModel): number {
    return item?.visitors?.length 
      ? item.visitors.map(v => v.visits).reduce((prev, curr) => prev + curr, 0) 
      : 0;
  }

  public blogVisitors(item: BlogpostModel): number {
    return item?.visitors?.length
      ? item.visitors.length
      : 0;
  }

  public orgaVisits(item: OrganisationModel): number {
    return item?.visitors?.length
      ? item.visitors.map(v => v.visits).reduce((prev, curr) => prev + curr, 0)
      : 0;
  }

  public orgaVisitors(item: OrganisationModel): number {
    return item?.visitors?.length
      ? item.visitors.length
      : 0;
  }

}
