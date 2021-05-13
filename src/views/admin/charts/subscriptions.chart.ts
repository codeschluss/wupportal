import { Component, OnInit } from '@angular/core';
import { BaseChart } from '../base/base.chart';

@Component({
  selector: 'subscriptions-chart',
  template: BaseChart.template({
    current: false
  })
})

export class SubscriptionsChartComponent
  extends BaseChart
  implements OnInit {

  public ngOnInit(): void {
    this.analyticsProvider.subscriptions()
      .subscribe((entries) => this.setData(entries));
  }

}
