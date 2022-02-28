import { Component } from '@angular/core';
import { BaseChart } from '../base/base.chart';

@Component({
  selector: 'appratings-statistic-chart',
  template: BaseChart.template({
    current: false
  })
})

export class AppRatingsStatisticsChartComponent
  extends BaseChart {

  public update(start: string, end: string): void {
    this.analyticsProvider.appRatings(
      start,
      end
    ).subscribe((entries) => this.setData(entries));
  }


}
