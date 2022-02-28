import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchAnalyticsDto } from 'src/api/models/search-analytics-dto';
import { AnalyticsProvider } from 'src/core';

@Component({
  selector: 'search-statistic-chart',
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title><i18n>totalClicks</i18n></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          {{(data | async)?.totalClicks}}
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title><i18n>totalImpressions</i18n></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          {{(data | async)?.totalImpressions}}
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title><i18n>averagePosition</i18n></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          {{(data | async)?.averagePosition | number: '1.0-0'}}
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title><i18n>clickImpressionRatio</i18n></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          {{(data | async)?.averageCtr | percent:'1.2'}}
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

export class SearchStatisticsChartComponent {

  public data: Observable<SearchAnalyticsDto>;

  constructor(private analyticsProvider: AnalyticsProvider) {}

  public update(start: string, end: string): void {
    this.data = this.analyticsProvider.searchOverview(
      start,
      end
    );
  }

}
