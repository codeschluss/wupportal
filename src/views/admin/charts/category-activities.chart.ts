import { Component } from '@angular/core';
import { BaseChart } from '../base/base.chart';

@Component({
  selector: 'category-activities-chart',
  template: BaseChart.template({
    current: true
  })
})

export class CategoryActivitiesChartComponent extends BaseChart { }
