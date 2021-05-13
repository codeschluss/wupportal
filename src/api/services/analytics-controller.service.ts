/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AnalyticsEntry } from '../models/analytics-entry';

/**
 * Analytics Controller
 */
@Injectable({
  providedIn: 'root',
})
class AnalyticsControllerService extends __BaseService {
  static readonly analyticsControllerCalculateActivitiesPerCategoryPath = '/analytic/activities/categories';
  static readonly analyticsControllerCalculateActivitiesPerSuburbsPath = '/analytic/activities/suburbs';
  static readonly analyticsControllerCalculateActivitiesPerTargetGroupPath = '/analytic/activities/targetgroups';
  static readonly analyticsControllerCalculateSubscriptionsPath = '/analytic/subscriptions';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * calculateActivitiesPerCategory
   * @param value undefined
   * @return OK
   */
  analyticsControllerCalculateActivitiesPerCategoryResponse(value?: boolean): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (value != null) __params = __params.set('value', value.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/analytic/activities/categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AnalyticsEntry>>;
      })
    );
  }
  /**
   * calculateActivitiesPerCategory
   * @param value undefined
   * @return OK
   */
  analyticsControllerCalculateActivitiesPerCategory(value?: boolean): __Observable<Array<AnalyticsEntry>> {
    return this.analyticsControllerCalculateActivitiesPerCategoryResponse(value).pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }

  /**
   * calculateActivitiesPerSuburbs
   * @param value undefined
   * @return OK
   */
  analyticsControllerCalculateActivitiesPerSuburbsResponse(value?: boolean): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (value != null) __params = __params.set('value', value.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/analytic/activities/suburbs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AnalyticsEntry>>;
      })
    );
  }
  /**
   * calculateActivitiesPerSuburbs
   * @param value undefined
   * @return OK
   */
  analyticsControllerCalculateActivitiesPerSuburbs(value?: boolean): __Observable<Array<AnalyticsEntry>> {
    return this.analyticsControllerCalculateActivitiesPerSuburbsResponse(value).pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }

  /**
   * calculateActivitiesPerTargetGroup
   * @param value undefined
   * @return OK
   */
  analyticsControllerCalculateActivitiesPerTargetGroupResponse(value?: boolean): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (value != null) __params = __params.set('value', value.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/analytic/activities/targetgroups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AnalyticsEntry>>;
      })
    );
  }
  /**
   * calculateActivitiesPerTargetGroup
   * @param value undefined
   * @return OK
   */
  analyticsControllerCalculateActivitiesPerTargetGroup(value?: boolean): __Observable<Array<AnalyticsEntry>> {
    return this.analyticsControllerCalculateActivitiesPerTargetGroupResponse(value).pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }

  /**
   * calculateSubscriptions
   * @return OK
   */
  analyticsControllerCalculateSubscriptionsResponse(): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/analytic/subscriptions`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AnalyticsEntry>>;
      })
    );
  }
  /**
   * calculateSubscriptions
   * @return OK
   */
  analyticsControllerCalculateSubscriptions(): __Observable<Array<AnalyticsEntry>> {
    return this.analyticsControllerCalculateSubscriptionsResponse().pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }
}

module AnalyticsControllerService {
}

export { AnalyticsControllerService }
