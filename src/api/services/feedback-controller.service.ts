/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Feedback } from '../models/feedback';

/**
 * Feedback Controller
 */
@Injectable({
  providedIn: 'root',
})
class FeedbackControllerService extends __BaseService {
  static readonly feedbackControllerFeedbackPath = '/feedback';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * feedback
   * @param feedback feedback
   * @return OK
   */
  feedbackControllerFeedbackResponse(feedback: Feedback): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = feedback;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/feedback`,
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
   * feedback
   * @param feedback feedback
   * @return OK
   */
  feedbackControllerFeedback(feedback: Feedback): __Observable<{}> {
    return this.feedbackControllerFeedbackResponse(feedback).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module FeedbackControllerService {
}

export { FeedbackControllerService }
