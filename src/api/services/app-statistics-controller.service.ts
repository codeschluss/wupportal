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
 * App Statistics Controller
 */
@Injectable({
  providedIn: 'root',
})
class AppStatisticsControllerService extends __BaseService {
  static readonly appStatisticsControllerAppStatisticsInstallsPath = '/app-statistics/install';
  static readonly appStatisticsControllerAppStatisticsRatingsPath = '/app-statistics/ratings';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * appStatisticsInstalls
   * @param startDate startDate
   * @param endDate endDate
   * @return OK
   */
  appStatisticsControllerAppStatisticsInstallsResponse(startDate: string,
    endDate: string): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (startDate != null) __params = __params.set('startDate', startDate.toString());
    if (endDate != null) __params = __params.set('endDate', endDate.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/app-statistics/install`,
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
   * appStatisticsInstalls
   * @param startDate startDate
   * @param endDate endDate
   * @return OK
   */
  appStatisticsControllerAppStatisticsInstalls(startDate: string,
    endDate: string): __Observable<Array<AnalyticsEntry>> {
    return this.appStatisticsControllerAppStatisticsInstallsResponse(startDate, endDate).pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }

  /**
   * appStatisticsRatings
   * @param startDate startDate
   * @param endDate endDate
   * @return OK
   */
  appStatisticsControllerAppStatisticsRatingsResponse(startDate: string,
    endDate: string): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (startDate != null) __params = __params.set('startDate', startDate.toString());
    if (endDate != null) __params = __params.set('endDate', endDate.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/app-statistics/ratings`,
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
   * appStatisticsRatings
   * @param startDate startDate
   * @param endDate endDate
   * @return OK
   */
  appStatisticsControllerAppStatisticsRatings(startDate: string,
    endDate: string): __Observable<Array<AnalyticsEntry>> {
    return this.appStatisticsControllerAppStatisticsRatingsResponse(startDate, endDate).pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }
}

module AppStatisticsControllerService {
}

export { AppStatisticsControllerService }
