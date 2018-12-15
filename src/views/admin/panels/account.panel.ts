import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfroute } from '@portal/core';
import { UserModel } from '../../../realm/user/user.model';

@Component({
  template: `
    <mat-tab-group>
      <mat-tab>
        <ng-template matTabLabel>
          <i18n i18n="@@userDetails">userDetails</i18n>
        </ng-template>
        <ng-container *ngIf="user">
          <user-form #form [item]="user"></user-form>
          <button mat-button [disabled]="!form.isValid" (click)="form.save()">
            <i18n i18n="@@save">save</i18n>
          </button>
        </ng-container>
      </mat-tab>

      <mat-tab [disabled]="!user?.organisations">
        <ng-template matTabLabel>
          <i18n i18n="@@userOrganisations">userOrganisations</i18n>
        </ng-template>
        <ng-template matTabContent>
          <organisation-table [items]="user.organisations">
          </organisation-table>
        </ng-template>
      </mat-tab>

      <mat-tab [disabled]="!user?.activities">
        <ng-template matTabLabel>
          <i18n i18n="@@userActivities">userActivities</i18n>
        </ng-template>
        <ng-template matTabContent>
          <activity-table [items]="user.activities">
          </activity-table>
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `
})

export class AccountPanelComponent extends Selfroute implements OnInit {

  public user: UserModel;

  protected routing: Route = {
    path: 'account/:uuid',
    component: AccountPanelComponent,
    resolve: {
      user: CrudResolver
    },
    data: {
      user: CrudJoiner.of(UserModel)
        .with('activities').yield('category')
        .with('activities').yield('provider').yield('organisation')
        .with('organisations').yield('address').yield('suburb')
    }
  };

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.user = this.route.snapshot.data.user;
  }

}
