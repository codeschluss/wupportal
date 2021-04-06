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
  static readonly pushControllerPushMailsPath = '/push/mails';
  static readonly pushControllerPushNotificationsPath = '/push/notifications';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * pushMails
   * @param message message
   * @return OK
   */
  pushControllerPushMailsResponse(message: MessageDto): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = message;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/push/mails`,
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
   * pushMails
   * @param message message
   * @return OK
   */
  pushControllerPushMails(message: MessageDto): __Observable<{}> {
    return this.pushControllerPushMailsResponse(message).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * pushNotifications
   * @param message message
   * @return OK
   */
  pushControllerPushNotificationsResponse(message: MessageDto): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = message;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/push/notifications`,
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
   * pushNotifications
   * @param message message
   * @return OK
   */
  pushControllerPushNotifications(message: MessageDto): __Observable<{}> {
    return this.pushControllerPushNotificationsResponse(message).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module PushControllerService {
}

export { PushControllerService }
