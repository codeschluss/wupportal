import { AfterViewInit, Component } from '@angular/core';
import { map, mergeMap, startWith } from 'rxjs';
import { BaseChart } from '../base/base.chart';

@Component({
  selector: 'category-activities-chart',
  template: BaseChart.template({
    current: true
  })
})

export class CategoryActivitiesChartComponent 
  extends BaseChart
  implements AfterViewInit {

  public ngAfterViewInit(): void {
    this.toggle.change.pipe(
      map((event) => event.checked),
      startWith(false),
      mergeMap((c) => this.analyticsProvider.activitiesPerCategory(c))
    ).subscribe((entries) => this.setData(entries));
  }
 }
