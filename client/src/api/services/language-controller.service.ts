/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { LanguageEntity } from '../models/language-entity';
import { ResourceLanguageEntity } from '../models/resource-language-entity';

/**
 * Language Controller
 */
@Injectable({
  providedIn: 'root',
})
class LanguageControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `LanguageControllerService.LanguageControllerReadAllParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * @return OK
   */
  languageControllerReadAllResponse(params: LanguageControllerService.LanguageControllerReadAllParams): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.filter != null) __params = __params.set('filter', params.filter.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/languages`,
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
   * @param params The `LanguageControllerService.LanguageControllerReadAllParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * @return OK
   */
  languageControllerReadAll(params: LanguageControllerService.LanguageControllerReadAllParams): Observable<{}> {
    return this.languageControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newLanguage newLanguage
   * @return OK
   */
  languageControllerCreateResponse(newLanguage: LanguageEntity): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newLanguage;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/languages`,
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
   * @param newLanguage newLanguage
   * @return OK
   */
  languageControllerCreate(newLanguage: LanguageEntity): Observable<{}> {
    return this.languageControllerCreateResponse(newLanguage).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param languageId languageId
   * @return OK
   */
  languageControllerReadOneResponse(languageId: string): Observable<StrictHttpResponse<ResourceLanguageEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/languages/${languageId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceLanguageEntity>;
      })
    );
  }
  /**
   * @param languageId languageId
   * @return OK
   */
  languageControllerReadOne(languageId: string): Observable<ResourceLanguageEntity> {
    return this.languageControllerReadOneResponse(languageId).pipe(
      __map(_r => _r.body as ResourceLanguageEntity)
    );
  }

  /**
   * @param newLanguage newLanguage
   * @param languageId languageId
   * @return OK
   */
  languageControllerUpdateResponse(newLanguage: LanguageEntity,
    languageId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newLanguage;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/languages/${languageId}`,
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
   * @param newLanguage newLanguage
   * @param languageId languageId
   * @return OK
   */
  languageControllerUpdate(newLanguage: LanguageEntity,
    languageId: string): Observable<{}> {
    return this.languageControllerUpdateResponse(newLanguage, languageId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param languageId languageId
   * @return OK
   */
  languageControllerDeleteResponse(languageId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/languages/${languageId}`,
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
   * @param languageId languageId
   * @return OK
   */
  languageControllerDelete(languageId: string): Observable<{}> {
    return this.languageControllerDeleteResponse(languageId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module LanguageControllerService {

  /**
   * Parameters for languageControllerReadAll
   */
  export interface LanguageControllerReadAllParams {
    sort?: string;
    dir?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { LanguageControllerService }
