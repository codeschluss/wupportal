/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Error Controller
 */
@Injectable({
  providedIn: 'root',
})
class ErrorControllerService extends __BaseService {
  static readonly errorControllerErrorPath = '/error';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * error
   * @param error error
   * @return OK
   */
  errorControllerErrorResponse(error: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = error;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/error`,
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
   * error
   * @param error error
   * @return OK
   */
  errorControllerError(error: string): __Observable<{}> {
    return this.errorControllerErrorResponse(error).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module ErrorControllerService {
}

export { ErrorControllerService }
