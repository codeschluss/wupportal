import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';

@Component({
  template: `
    <mat-tab-group>
      <mat-tab>
        <ng-template matTabLabel>
          <i18n i18n="@@userDetails">userDetails</i18n>
        </ng-template>
        <user-form #form [item]="data.user"></user-form>
        <button mat-button [disabled]="!form.isValid" (click)="form.save()">
          <i18n i18n="@@save">save</i18n>
        </button>
      </mat-tab>

      <mat-tab [disabled]="!organisations.length">
        <ng-template matTabLabel>
          <i18n i18n="@@userOrganisations">userOrganisations</i18n>
        </ng-template>
        <ng-template matTabContent>
          <organisation-table [items]="organisations"></organisation-table>
        </ng-template>
      </mat-tab>

      <mat-tab [disabled]="!activities.length">
        <ng-template matTabLabel>
          <i18n i18n="@@userActivities">userActivities</i18n>
        </ng-template>
        <ng-template matTabContent>
          <activity-table [items]="activities"></activity-table>
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `
})

export class AccountPanelComponent implements OnInit {

  // public static get route(): Route {
  //   return {
  //     path: 'account/:uuid',
  //     component: AccountPanelComponent,
  //     resolve: {
  //       activities: CrudResolver,
  //       organisations: CrudResolver,
  //       session: SessionResolver,
  //       user: CrudResolver
  //     },
  //     data: {
  //       activities: CrudJoiner.of(ActivityModel, { filter: null }),
  //       organisations: CrudJoiner.of(OrganisationModel, { filter: null })
  //         .with('address').yield('suburb'),
  //       user: CrudJoiner.of(UserModel)
  //     }
  //   };
  // }

  public data: Data = this.route.snapshot.data;

  public activities: ActivityModel[] = [];

  public organisations: OrganisationModel[] = [];

  public constructor(
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    const token = this.data.session.accessToken;
    this.organisations = [...token.adminOrgas, ...token.approvedOrgas]
      .map((id) => this.data.organisations.find((item) => item.id === id));
    this.activities = token.createdActivities
      .map((id) => this.data.activities.find((item) => item.id === id));
  }

}
