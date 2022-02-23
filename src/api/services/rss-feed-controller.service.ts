/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { View } from '../models/view';

/**
 * Rss Feed Controller
 */
@Injectable({
  providedIn: 'root',
})
class RssFeedControllerService extends __BaseService {
  static readonly rssFeedControllerGetFeedPath = '/rss';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getFeed
   * @return OK
   */
  rssFeedControllerGetFeedResponse(): __Observable<__StrictHttpResponse<View>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rss`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<View>;
      })
    );
  }
  /**
   * getFeed
   * @return OK
   */
  rssFeedControllerGetFeed(): __Observable<View> {
    return this.rssFeedControllerGetFeedResponse().pipe(
      __map(_r => _r.body as View)
    );
  }
}

module RssFeedControllerService {
}

export { RssFeedControllerService }
