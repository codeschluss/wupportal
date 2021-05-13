/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { MarkupEntity } from '../models/markup-entity';
import { ResourceMarkupEntity } from '../models/resource-markup-entity';

/**
 * Markup Controller
 */
@Injectable({
  providedIn: 'root',
})
class MarkupControllerService extends __BaseService {
  static readonly markupControllerReadAllPath = '/markups';
  static readonly markupControllerCreatePath = '/markups';
  static readonly markupControllerImportMarkupsPath = '/markups/import';
  static readonly markupControllerReadOnePath = '/markups/{markupId}';
  static readonly markupControllerUpdatePath = '/markups/{markupId}';
  static readonly markupControllerDeletePath = '/markups/{markupId}';
  static readonly markupControllerReadTranslationsPath = '/markups/{markupId}/translations';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `MarkupControllerService.MarkupControllerReadAllParams` containing the following parameters:
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
  markupControllerReadAllResponse(params: MarkupControllerService.MarkupControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
      this.rootUrl + `/markups`,
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
   * @param params The `MarkupControllerService.MarkupControllerReadAllParams` containing the following parameters:
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
  markupControllerReadAll(params: MarkupControllerService.MarkupControllerReadAllParams): __Observable<{}> {
    return this.markupControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newmarkup newmarkup
   * @return OK
   */
  markupControllerCreateResponse(newmarkup: MarkupEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newmarkup;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/markups`,
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
   * @param newmarkup newmarkup
   * @return OK
   */
  markupControllerCreate(newmarkup: MarkupEntity): __Observable<{}> {
    return this.markupControllerCreateResponse(newmarkup).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * importMarkups
   * @param file file
   * @return OK
   */
  markupControllerImportMarkupsResponse(file: Blob): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (file != null) { __formData.append('file', file as string | Blob);}
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/markups/import`,
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
   * importMarkups
   * @param file file
   * @return OK
   */
  markupControllerImportMarkups(file: Blob): __Observable<{}> {
    return this.markupControllerImportMarkupsResponse(file).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param markupId markupId
   * @return OK
   */
  markupControllerReadOneResponse(markupId: string): __Observable<__StrictHttpResponse<ResourceMarkupEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/markups/${encodeURIComponent(String(markupId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceMarkupEntity>;
      })
    );
  }
  /**
   * readOne
   * @param markupId markupId
   * @return OK
   */
  markupControllerReadOne(markupId: string): __Observable<ResourceMarkupEntity> {
    return this.markupControllerReadOneResponse(markupId).pipe(
      __map(_r => _r.body as ResourceMarkupEntity)
    );
  }

  /**
   * update
   * @param newmarkup newmarkup
   * @param markupId markupId
   * @return OK
   */
  markupControllerUpdateResponse(newmarkup: MarkupEntity,
    markupId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newmarkup;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/markups/${encodeURIComponent(String(markupId))}`,
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
   * @param newmarkup newmarkup
   * @param markupId markupId
   * @return OK
   */
  markupControllerUpdate(newmarkup: MarkupEntity,
    markupId: string): __Observable<{}> {
    return this.markupControllerUpdateResponse(newmarkup, markupId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param markupId markupId
   * @return OK
   */
  markupControllerDeleteResponse(markupId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/markups/${encodeURIComponent(String(markupId))}`,
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
   * @param markupId markupId
   * @return OK
   */
  markupControllerDelete(markupId: string): __Observable<{}> {
    return this.markupControllerDeleteResponse(markupId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param markupId markupId
   * @return OK
   */
  markupControllerReadTranslationsResponse(markupId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/markups/${encodeURIComponent(String(markupId))}/translations`,
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
   * readTranslations
   * @param markupId markupId
   * @return OK
   */
  markupControllerReadTranslations(markupId: string): __Observable<{}> {
    return this.markupControllerReadTranslationsResponse(markupId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module MarkupControllerService {

  /**
   * Parameters for markupControllerReadAll
   */
  export interface MarkupControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { MarkupControllerService }
