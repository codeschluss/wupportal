/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { MessageDto } from '../models/message-dto';

/**
 * Push Controller
 */
@Injectable({
  providedIn: 'root',
})
class PushControllerService extends __BaseService {
  static readonly pushControllerPushContentPath = '/push/content';
  static readonly pushControllerPushNewsPath = '/push/news';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param message message
   * @param link link
   * @return OK
   */
  pushControllerPushContentResponse(message: MessageDto,
    link: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = message;
    __body = link;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/push/content`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param message message
   * @param link link
   * @return OK
   */
  pushControllerPushContent(message: MessageDto,
    link: string): __Observable<{}> {
    return this.pushControllerPushContentResponse(message, link).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param message message
   * @return OK
   */
  pushControllerPushNewsResponse(message: MessageDto): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = message;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/push/news`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param message message
   * @return OK
   */
  pushControllerPushNews(message: MessageDto): __Observable<{}> {
    return this.pushControllerPushNewsResponse(message).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module PushControllerService {
}

export { PushControllerService }
