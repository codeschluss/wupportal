import { Component } from '@angular/core';
import { BaseChart } from '../base/base.chart';

@Component({
  selector: 'target-group-activities-chart',
  template: BaseChart.template({
    current: true
  })
})

export class TargetGroupActivitiesChartComponent extends BaseChart { }
