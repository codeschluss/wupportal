/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AnalyticsDto } from '../models/analytics-dto';
import { SearchAnalyticsDto } from '../models/search-analytics-dto';

/**
 * Search Console Controller
 */
@Injectable({
  providedIn: 'root',
})
class SearchConsoleControllerService extends __BaseService {
  static readonly searchConsoleControllerSearchConsoleDetailsPath = '/search-console/details';
  static readonly searchConsoleControllerSearchConsoleOverviewPath = '/search-console/overview';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * searchConsoleDetails
   * @param startDate startDate
   * @param endDate endDate
   * @param dimension dimension
   * @return OK
   */
  searchConsoleControllerSearchConsoleDetailsResponse(startDate: string,
    endDate: string,
    dimension: 'COUNTRY' | 'DATE' | 'DEVICE' | 'PAGE' | 'QUERY'): __Observable<__StrictHttpResponse<Array<AnalyticsDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (startDate != null) __params = __params.set('startDate', startDate.toString());
    if (endDate != null) __params = __params.set('endDate', endDate.toString());
    if (dimension != null) __params = __params.set('dimension', dimension.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/search-console/details`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AnalyticsDto>>;
      })
    );
  }
  /**
   * searchConsoleDetails
   * @param startDate startDate
   * @param endDate endDate
   * @param dimension dimension
   * @return OK
   */
  searchConsoleControllerSearchConsoleDetails(startDate: string,
    endDate: string,
    dimension: 'COUNTRY' | 'DATE' | 'DEVICE' | 'PAGE' | 'QUERY'): __Observable<Array<AnalyticsDto>> {
    return this.searchConsoleControllerSearchConsoleDetailsResponse(startDate, endDate, dimension).pipe(
      __map(_r => _r.body as Array<AnalyticsDto>)
    );
  }

  /**
   * searchConsoleOverview
   * @param startDate startDate
   * @param endDate endDate
   * @return OK
   */
  searchConsoleControllerSearchConsoleOverviewResponse(startDate: string,
    endDate: string): __Observable<__StrictHttpResponse<SearchAnalyticsDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (startDate != null) __params = __params.set('startDate', startDate.toString());
    if (endDate != null) __params = __params.set('endDate', endDate.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/search-console/overview`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SearchAnalyticsDto>;
      })
    );
  }
  /**
   * searchConsoleOverview
   * @param startDate startDate
   * @param endDate endDate
   * @return OK
   */
  searchConsoleControllerSearchConsoleOverview(startDate: string,
    endDate: string): __Observable<SearchAnalyticsDto> {
    return this.searchConsoleControllerSearchConsoleOverviewResponse(startDate, endDate).pipe(
      __map(_r => _r.body as SearchAnalyticsDto)
    );
  }
}

module SearchConsoleControllerService {
}

export { SearchConsoleControllerService }
