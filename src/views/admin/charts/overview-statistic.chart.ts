import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivityProvider, BlogpostProvider, OrganisationProvider } from 'src/core';

@Component({
  selector: 'overview-statistic-chart',
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title><i18n>activity</i18n></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <span><i18n>visits</i18n></span>: {{(activityVisits | async)}} <br>
        <span><i18n>visitors</i18n></span>: {{(activityVisitors | async)}}
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title><i18n>organisation</i18n></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <span><i18n>visits</i18n></span>: {{(organisationVisits | async)}} <br>
        <span><i18n>visitors</i18n></span>: {{(organisationVisitors | async)}}
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title><i18n>blogpost</i18n></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <span><i18n>visits</i18n></span>: {{(blogpostVisits | async)}} <br>
        <span><i18n>visitors</i18n></span>: {{(blogpostVisitors | async)}}
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

  public activityVisits: Observable<number>;
  public activityVisitors: Observable<number>;
  public blogpostVisits: Observable<number>;
  public blogpostVisitors: Observable<number>;
  public organisationVisits: Observable<number>;
  public organisationVisitors: Observable<number>;

  

  constructor(
    public activityProvider: ActivityProvider,
    public blogpostProvider: BlogpostProvider,
    public organisationProvider: OrganisationProvider) {
      this.activityVisits = this.activityProvider.analyticsVisitsAll()
        .pipe(map(response => response.body as number));
      
      this.activityVisitors = this.activityProvider.analyticsVisitorsAll()
        .pipe(map(response => response.body as number))

      this.blogpostVisits = this.blogpostProvider.analyticsVisitsAll()
        .pipe(map(response => response.body as number))

      this.blogpostVisitors = this.blogpostProvider.analyticsVisitorsAll()
        .pipe(map(response => response.body as number))

      this.organisationVisits = this.organisationProvider.analyticsVisitsAll()
        .pipe(map(response => response.body as number))

      this.organisationVisitors = this.organisationProvider.analyticsVisitorsAll()
        .pipe(map(response => response.body as number))
    }

}
