/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { News } from '../models/news';
import { SubscriptionEntity } from '../models/subscription-entity';

/**
 * News Controller
 */
@Injectable({
  providedIn: 'root',
})
class NewsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param news news
   * @return OK
   */
  newsControllerPushNewsResponse(news: News): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = news;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/news/push`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param news news
   * @return OK
   */
  newsControllerPushNews(news: News): Observable<{}> {
    return this.newsControllerPushNewsResponse(news).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newSubscription newSubscription
   * @return OK
   */
  newsControllerSubscribeResponse(newSubscription: SubscriptionEntity): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newSubscription;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/news/subscribe`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newSubscription newSubscription
   * @return OK
   */
  newsControllerSubscribe(newSubscription: SubscriptionEntity): Observable<{}> {
    return this.newsControllerSubscribeResponse(newSubscription).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param subscriptionId subscriptionId
   * @return OK
   */
  newsControllerUnsubscribeResponse(subscriptionId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/news/unsubscribe/${subscriptionId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param subscriptionId subscriptionId
   * @return OK
   */
  newsControllerUnsubscribe(subscriptionId: string): Observable<{}> {
    return this.newsControllerUnsubscribeResponse(subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module NewsControllerService {
}

export { NewsControllerService }
