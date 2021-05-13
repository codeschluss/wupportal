/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TranslationResult } from '../models/translation-result';

/**
 * Translation Controller
 */
@Injectable({
  providedIn: 'root',
})
class TranslationControllerService extends __BaseService {
  static readonly translationControllerTranslatePath = '/translations/translate';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * translate
   * @param labels labels
   * @param targets undefined
   * @param source undefined
   * @return OK
   */
  translationControllerTranslateResponse(labels: {[key: string]: string},
    targets?: Array<string>,
    source?: string): __Observable<__StrictHttpResponse<Array<TranslationResult>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = labels;
    (targets || []).forEach(val => {if (val != null) __params = __params.append('targets', val.toString())});
    if (source != null) __params = __params.set('source', source.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/translations/translate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TranslationResult>>;
      })
    );
  }
  /**
   * translate
   * @param labels labels
   * @param targets undefined
   * @param source undefined
   * @return OK
   */
  translationControllerTranslate(labels: {[key: string]: string},
    targets?: Array<string>,
    source?: string): __Observable<Array<TranslationResult>> {
    return this.translationControllerTranslateResponse(labels, targets, source).pipe(
      __map(_r => _r.body as Array<TranslationResult>)
    );
  }
}

module TranslationControllerService {
}

export { TranslationControllerService }
