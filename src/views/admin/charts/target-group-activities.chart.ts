import { AfterViewInit, Component } from '@angular/core';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { BaseChart } from '../base/base.chart';

@Component({
  selector: 'target-group-activities-chart',
  template: BaseChart.template({
    current: true
  })
})

export class TargetGroupActivitiesChartComponent
  extends BaseChart
  implements AfterViewInit {

  public ngAfterViewInit(): void {
    this.toggle.change.pipe(
      map((event) => event.checked),
      startWith(false),
      mergeMap((c) => this.analyticsProvider.activitiesPerTargetGroup(c))
    ).subscribe((entries) => this.setData(entries));
  }

}
