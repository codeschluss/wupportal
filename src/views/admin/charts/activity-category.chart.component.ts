import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AnalyticsProvider } from '../../../base/providers/analytics.provider';
import { AnalyticsEntry } from '../../../api/models/analytics-entry';

@Component({
  selector: 'activity-category-chart',
  template: `
    <ngx-charts-bar-vertical
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]=true
      [yAxis]=true
      [showXAxisLabel]=true
      [showYAxisLabel]=true
      [xAxisLabel]="'Kategorien'"
      [yAxisLabel]="'Anzahl'">
    </ngx-charts-bar-vertical>
  `
})
export class ActivityCategoryChartComponent implements OnDestroy {
  results = [];
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  dataSubscription: Subscription;

  constructor(
    private dataService: AnalyticsProvider) {
      this.dataSubscription = this.dataService
        .activitiesPerCategoryCalc(false)
        .subscribe((result: Array<AnalyticsEntry>) => {
          this.results = result;
      });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
