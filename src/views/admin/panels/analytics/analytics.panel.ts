import { Component, ViewChild } from '@angular/core';
import { CrudJoiner } from '../../../../core';
import { BasePanel } from '../../base/base.panel';
import { AppInstallsStatisticsChartComponent } from '../../charts/appinstalls-statistic.chart';
import { AppRatingsStatisticsChartComponent } from '../../charts/appratings-statistic.chart';

@Component({
  templateUrl: 'analytics.panel.html',
  styles: [`
    .search { 
      display: flex;
      flex-direction: column;
    }

    .search-field {
      display: flex !important;
      justify-content: center !important;
    }
    `
  ]
})

export class AnalyticsPanelComponent
  extends BasePanel {

  @ViewChild('installs') installs: AppInstallsStatisticsChartComponent;

  @ViewChild('ratings') ratings: AppRatingsStatisticsChartComponent;

  @ViewChild('search') search: AppRatingsStatisticsChartComponent;

  protected path: string = 'analytics';

  protected resolve: Record<string, CrudJoiner> = { };

  private startDate: string;

  public start(event: any): void {
    this.startDate = this.format(event.value);
  }

  public updateApp(event: any): void {
    if (this.startDate && event.value) {
      let endDate = this.format(event.value);
      this.installs.update(this.startDate, endDate);
      this.ratings.update(this.startDate, endDate);
    }
  }

  public updateSearch(event: any): void {
    if (this.startDate && event.value) {
      this.search.update(
          this.startDate,
          this.format(event.value));
    }
  }

  private format(date: Date): string {
    return date?.toISOString();
  }

}
