import { Component, OnInit } from '@angular/core';
import { BaseChart } from '../base/base.chart';

@Component({
  selector: 'appinstalls-statistic-chart',
  template: BaseChart.template({
    current: false
  })
})

export class AppInstallsStatisticsChartComponent
  extends BaseChart
  implements OnInit{

  public ngOnInit(): void {
    this.analyticsProvider.appInstalls(
      '2022-02-24',
      '2022-02-26'
    ).subscribe((entries) => this.setData(entries));
  }

}
