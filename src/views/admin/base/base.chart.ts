import { OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { AnalyticsEntry } from '../../../api/models/analytics-entry';

export abstract class BaseChart implements OnDestroy {

  protected results: Array<AnalyticsEntry> = [];

  protected colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#D32F2F', '#00838F', '#1976D2']
  };

  protected dataSubscription: Subscription;
  protected filterSubscription: Subscription;

  protected xAxisLabel: string;
  protected yAxisLabel: string;

  protected yScaleMax: number = 30;

  protected static template(additionals: string = '') {
    return `
      ${additionals}
      [scheme]="colorScheme"
      [results]="results"
      [yScaleMax]="yScaleMax"
      [xAxis]=true
      [yAxis]=true
      [showXAxisLabel]=true
      [showYAxisLabel]=true
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    `
  }

  protected setData(result: Array<AnalyticsEntry>) {
    this.setCustomColor(result);
    this.results = result;
  }

  protected setCustomColor(result: Array<AnalyticsEntry>) {
    if (result.every(entry => entry.customColor)) {
      this.colorScheme.domain = result.map(entry => entry.customColor);
    }
  }

  public ngOnDestroy(): void {
    if (this.filterSubscription) this.filterSubscription.unsubscribe();
    if (this.dataSubscription) this.dataSubscription.unsubscribe();
  }
}
