import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsEntry } from 'src/api/models/analytics-entry';
import { SubscriptionControllerService } from 'src/api/services/subscription-controller.service';
import { AnalyticsDto } from '../../api/models/analytics-dto';
import { SearchAnalyticsDto } from '../../api/models/search-analytics-dto';
import { ActivityControllerService } from '../../api/services/activity-controller.service';
import { AppStatisticsControllerService } from '../../api/services/app-statistics-controller.service';
import { SearchConsoleControllerService } from '../../api/services/search-console-controller.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsProvider {

  public constructor(
    private activity: ActivityControllerService,
    private appStatistics: AppStatisticsControllerService,
    private searchConsole: SearchConsoleControllerService,
    private subscription: SubscriptionControllerService
  ) { }

  public activitiesPerCategory(
    current: boolean
  ): Observable<AnalyticsEntry[]> {
    return this.activity
      .activityControllerCalculateActivitiesPerCategory(current);
  }

    public activitiesPerSuburb(
    current: boolean
  ): Observable<AnalyticsEntry[]> {
    return this.activity
      .activityControllerCalculateActivitiesPerSuburbs(current);
  }

  public activitiesPerTargetGroup(
    current: boolean
  ): Observable<AnalyticsEntry[]> {
    return this.activity
      .activityControllerCalculateActivitiesPerTargetGroup(current);
  }

  public appInstalls(
    start: string,
    end: string
  ): Observable<AnalyticsEntry[]> {
    return this.appStatistics
      .appStatisticsControllerAppStatisticsInstalls(start, end);
  }

  public appRatings(
    start: string,
    end: string
  ): Observable<AnalyticsEntry[]> {
    return this.appStatistics
      .appStatisticsControllerAppStatisticsRatings(start, end);
  }

  public searchDetails(
    start: string,
    end: string,
    dimension: 'COUNTRY' | 'DATE' | 'DEVICE' | 'PAGE' | 'QUERY'
  ): Observable<AnalyticsDto[]> {
    return this.searchConsole
      .searchConsoleControllerSearchConsoleDetails(start, end, dimension);
  }

  public searchOverview(
    start: string,
    end: string
  ): Observable<SearchAnalyticsDto> {
    return this.searchConsole
      .searchConsoleControllerSearchConsoleOverview(start, end);
  }

  public subscriptions(): Observable<AnalyticsEntry[]> {
    return this.subscription.subscriptionControllerCalculateSubscriptions();
  }

}
