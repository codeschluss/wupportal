import { Component } from '@angular/core';

import { AnalyticsEntry } from 'src/api/models/analytics-entry';
import { AnalyticsProvider } from '../../../base/providers/analytics.provider';
import { BaseChart } from '../base/base.chart';

@Component({
  selector: 'subscription-chart',
  template: `<ngx-charts-bar-vertical`
      + BaseChart.template() + `>
    </ngx-charts-bar-vertical>`
})
export class SubscriptionChartComponent extends BaseChart {

  constructor(
    private dataService: AnalyticsProvider) {
      super();
      this.dataSubscription = this.dataService.subscriptionCalc()
        .subscribe((result: Array<AnalyticsEntry>) => super.setData(result))
  }
}
