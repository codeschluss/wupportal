import { Component } from '@angular/core';
import { BaseChart } from '../base/base.chart';

@Component({
  selector: 'appinstalls-statistic-chart',
  template: BaseChart.template({
    current: false
  })
})

export class AppInstallsStatisticsChartComponent
  extends BaseChart {

  public update(start: string, end: string): void {
    this.analyticsProvider.appInstalls(
      start,
      end
    ).subscribe((entries) => this.setData(entries));
  }

}
