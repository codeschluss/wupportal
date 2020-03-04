import { Component } from '@angular/core';

import { AnalyticsEntry } from 'src/api/models/analytics-entry';
import { AnalyticsProvider } from '../../../base/providers/analytics.provider';
import { BaseChart } from '../base/base.chart';
import { CurrentFilterService } from '../filter/current-filter.service';

@Component({
  selector: 'activity-category-chart',
  template: `<ngx-charts-bar-vertical`
      + BaseChart.template() + `>
    </ngx-charts-bar-vertical>`
})
export class ActivityCategoryChartComponent extends BaseChart {

  constructor(
    private filter: CurrentFilterService,
    private dataService: AnalyticsProvider) {
      super();
      this.filterSubscription = this.filter.filterChange.subscribe(
        (current: boolean) => {
          this.dataSubscription = this.dataService.activitiesPerCategoryCalc(current)
            .subscribe((result: Array<AnalyticsEntry>) => super.setData(result));
    });
  }
}
