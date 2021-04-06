import { Directive, HostBinding, ViewChild } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AnalyticsEntry } from '../../../api/models/analytics-entry';
import { AnalyticsProvider } from '../../../core';

@Directive()

// tslint:disable-next-line:directive-class-suffix
export abstract class BaseChart {

  @HostBinding('attr.base')
  public readonly base: string = 'chart';

  public colors = {
    domain: [
      '#9370DB',
      '#87CEFA',
      '#FA8072',
      '#FF7F50',
      '#90EE90',
      '#D32F2F',
      '#00838F',
      '#1976D2'
    ]
  };

  public data: AnalyticsEntry[] = [];

  public yScaleMax: number;

  @ViewChild(MatSlideToggle, { static: true })
  protected toggle: MatSlideToggle;

  protected static template(filters: {
    current: boolean
  }) {
    return `
      ${!filters.current ? `` : `
        <mat-slide-toggle color="primary">
          <i18n>current</i18n>
        </mat-slide-toggle>
      `}
      <ngx-charts-bar-vertical
        [animations]="false"
        [results]="data"
        [scheme]="colors"
        [showDataLabel]="true"
        [showXAxisLabel]="true"
        [tooltipDisabled]="true"
        [xAxis]="true"
        [yScaleMax]="yScaleMax">
      </ngx-charts-bar-vertical>
    `;
  }

  public constructor(
    protected analyticsProvider: AnalyticsProvider
  ) { }

  protected setData(entries: AnalyticsEntry[]) {
    if (entries.every((result) => result.customColor)) {
      this.colors.domain = entries.map((result) => result.customColor);
    }

    this.yScaleMax = this.yScaleMax
      || Math.max.apply(Math, entries.map((i) => i.value));

    this.data = entries;
  }

}
