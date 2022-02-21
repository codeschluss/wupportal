import { Component } from '@angular/core';
import { BaseChart } from '../base/base.chart';

@Component({
  selector: 'suburb-activities-chart',
  template: BaseChart.template({
    current: true
  })
})

export class SuburbActivitiesChartComponent extends BaseChart { }
