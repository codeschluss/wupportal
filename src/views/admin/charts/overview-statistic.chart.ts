import { Component } from '@angular/core';
import { take } from 'rxjs';
import { ActivityProvider, BlogpostProvider, OrganisationProvider } from 'src/core';
import { VisitableModel } from 'src/core/models/visitable.model';

@Component({
  selector: 'overview-statistic-chart',
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title><i18n>activity</i18n></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <span><i18n>visits</i18n></span>: {{activityVisits}} <br>
        <span><i18n>visitors</i18n></span>: {{activityVisitors}}
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title><i18n>organisation</i18n></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <span><i18n>visits</i18n></span>: {{organisationVisits}} <br>
        <span><i18n>visitors</i18n></span>: {{organisationVisitors}}
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title><i18n>blogpost</i18n></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <span><i18n>visits</i18n></span>: {{blogpostVisits}} <br>
        <span><i18n>visitors</i18n></span>: {{blogpostVisitors}}
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container { 
      display: flex;
      flex-flow: row wrap;
    }`
  ]
})

export class OverviewStatisticsChartComponent {

  public activityVisits: number;
  public activityVisitors: number;
  public blogpostVisits: number;
  public blogpostVisitors: number;
  public organisationVisits: number;
  public organisationVisitors: number;

  

  constructor(
    public activityProvider: ActivityProvider,
    public blogpostProvider: BlogpostProvider,
    public organisationProvider: OrganisationProvider) {
      this.activityProvider.analyticsVisitorsAll()
        .pipe(take(1))
        .subscribe((result: VisitableModel[]) => {
          this.activityVisits = result?.length ? result.map(v => v.visits).reduce((prev, curr) => prev + curr, 0) : 0;
          this.activityVisitors = result?.length ? result.length : 0;
        });

      this.blogpostProvider.analyticsVisitorsAll()
        .pipe(take(1))
        .subscribe((result: VisitableModel[]) => {
          this.blogpostVisits = result?.length ? result.map(v => v.visits).reduce((prev, curr) => prev + curr, 0) : 0;
          this.blogpostVisitors = result?.length ? result.length : 0;
        });

      this.organisationProvider.analyticsVisitorsAll()
        .pipe(take(1))
        .subscribe((result: VisitableModel[]) => {
          this.organisationVisits = result?.length ? result.map(v => v.visits).reduce((prev, curr) => prev + curr, 0) : 0;
          this.organisationVisitors = result?.length ? result.length : 0;
        });
    }

}
