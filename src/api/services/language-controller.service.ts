/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { LanguageEntity } from '../models/language-entity';
import { ResourceLanguageEntity } from '../models/resource-language-entity';

/**
 * Language Controller
 */
@Injectable({
  providedIn: 'root',
})
class LanguageControllerService extends __BaseService {
  static readonly languageControllerReadAllPath = '/languages';
  static readonly languageControllerCreatePath = '/languages';
  static readonly languageControllerReadOnePath = '/languages/{languageId}';
  static readonly languageControllerUpdatePath = '/languages/{languageId}';
  static readonly languageControllerDeletePath = '/languages/{languageId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `LanguageControllerService.LanguageControllerReadAllParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `embeddings`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * @return OK
   */
  languageControllerReadAllResponse(params: LanguageControllerService.LanguageControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
    if (params.embeddings != null) __params = __params.set('embeddings', params.embeddings.toString());
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readAll
   * @param params The `LanguageControllerService.LanguageControllerReadAllParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `embeddings`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * @return OK
   */
  languageControllerReadAll(params: LanguageControllerService.LanguageControllerReadAllParams): __Observable<{}> {
    return this.languageControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newLanguage newLanguage
   * @return OK
   */
  languageControllerCreateResponse(newLanguage: LanguageEntity): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * create
   * @param newLanguage newLanguage
   * @return OK
   */
  languageControllerCreate(newLanguage: LanguageEntity): __Observable<{}> {
    return this.languageControllerCreateResponse(newLanguage).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param languageId languageId
   * @return OK
   */
  languageControllerReadOneResponse(languageId: string): __Observable<__StrictHttpResponse<ResourceLanguageEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/languages/${encodeURIComponent(String(languageId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceLanguageEntity>;
      })
    );
  }
  /**
   * readOne
   * @param languageId languageId
   * @return OK
   */
  languageControllerReadOne(languageId: string): __Observable<ResourceLanguageEntity> {
    return this.languageControllerReadOneResponse(languageId).pipe(
      __map(_r => _r.body as ResourceLanguageEntity)
    );
  }

  /**
   * update
   * @param newLanguage newLanguage
   * @param languageId languageId
   * @return OK
   */
  languageControllerUpdateResponse(newLanguage: LanguageEntity,
    languageId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newLanguage;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/languages/${encodeURIComponent(String(languageId))}`,
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
   * update
   * @param newLanguage newLanguage
   * @param languageId languageId
   * @return OK
   */
  languageControllerUpdate(newLanguage: LanguageEntity,
    languageId: string): __Observable<{}> {
    return this.languageControllerUpdateResponse(newLanguage, languageId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param languageId languageId
   * @return OK
   */
  languageControllerDeleteResponse(languageId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/languages/${encodeURIComponent(String(languageId))}`,
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
   * delete
   * @param languageId languageId
   * @return OK
   */
  languageControllerDelete(languageId: string): __Observable<{}> {
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
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { LanguageControllerService }
