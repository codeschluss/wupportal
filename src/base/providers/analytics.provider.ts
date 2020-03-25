import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsEntry } from 'src/api/models/analytics-entry';
import { AnalyticsControllerService } from '../../api/services/analytics-controller.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsProvider {

  public constructor(
    private service: AnalyticsControllerService
  ) { }

  public activitiesPerCategory(
    current: boolean
  ): Observable<AnalyticsEntry[]> {
    return this.service
      .analyticsControllerCalculateActivitiesPerCategory(current);
  }

  public activitiesPerSuburb(
    current: boolean
  ): Observable<AnalyticsEntry[]> {
    return this.service
      .analyticsControllerCalculateActivitiesPerSuburbs(current);
  }

  public activitiesPerTargetGroup(
    current: boolean
  ): Observable<AnalyticsEntry[]> {
    return this.service
      .analyticsControllerCalculateActivitiesPerTargetGroup(current);
  }

  public subscriptions(): Observable<AnalyticsEntry[]> {
    return this.service.analyticsControllerCalculateSubscriptions();
  }

}
