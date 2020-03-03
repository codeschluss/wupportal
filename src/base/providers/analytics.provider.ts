import { Injectable, Type } from '@angular/core';

import { AnalyticsControllerService } from '../../api/services/analytics-controller.service';
import { AnalyticsEntry } from 'src/api/models/analytics-entry';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AnalyticsProvider {

  public constructor(
    private service: AnalyticsControllerService
  ) { }

  public subscriptionCalc(): Observable<Array<AnalyticsEntry>> {
    return this.service.analyticsControllerCalculateSubscriptions();
  }

  public activitiesPerCategoryCalc(currentOnly: boolean): Observable<Array<AnalyticsEntry>> {
    return this.service.analyticsControllerCalculateActivitiesPerCategory(currentOnly);
  }

  public activitiesPerTargetGroupCalc(currentOnly: boolean): Observable<Array<AnalyticsEntry>> {
    return this.service.analyticsControllerCalculateActivitiesPerTargetGroup(currentOnly);
  }
}
