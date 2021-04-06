/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { SuburbEntity } from '../models/suburb-entity';
import { ResourceSuburbEntity } from '../models/resource-suburb-entity';

/**
 * Suburb Controller
 */
@Injectable({
  providedIn: 'root',
})
class SuburbControllerService extends __BaseService {
  static readonly suburbControllerReadAllPath = '/suburbs';
  static readonly suburbControllerCreatePath = '/suburbs';
  static readonly suburbControllerReadOnePath = '/suburbs/{surburbId}';
  static readonly suburbControllerUpdatePath = '/suburbs/{surburbId}';
  static readonly suburbControllerDeletePath = '/suburbs/{surburbId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `SuburbControllerService.SuburbControllerReadAllParams` containing the following parameters:
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
  suburbControllerReadAllResponse(params: SuburbControllerService.SuburbControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
      this.rootUrl + `/suburbs`,
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
   * @param params The `SuburbControllerService.SuburbControllerReadAllParams` containing the following parameters:
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
  suburbControllerReadAll(params: SuburbControllerService.SuburbControllerReadAllParams): __Observable<{}> {
    return this.suburbControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newSuburb newSuburb
   * @return OK
   */
  suburbControllerCreateResponse(newSuburb: SuburbEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newSuburb;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/suburbs`,
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
   * @param newSuburb newSuburb
   * @return OK
   */
  suburbControllerCreate(newSuburb: SuburbEntity): __Observable<{}> {
    return this.suburbControllerCreateResponse(newSuburb).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerReadOneResponse(surburbId: string): __Observable<__StrictHttpResponse<ResourceSuburbEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/suburbs/${encodeURIComponent(String(surburbId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceSuburbEntity>;
      })
    );
  }
  /**
   * readOne
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerReadOne(surburbId: string): __Observable<ResourceSuburbEntity> {
    return this.suburbControllerReadOneResponse(surburbId).pipe(
      __map(_r => _r.body as ResourceSuburbEntity)
    );
  }

  /**
   * update
   * @param newSuburb newSuburb
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerUpdateResponse(newSuburb: SuburbEntity,
    surburbId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newSuburb;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/suburbs/${encodeURIComponent(String(surburbId))}`,
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
   * @param newSuburb newSuburb
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerUpdate(newSuburb: SuburbEntity,
    surburbId: string): __Observable<{}> {
    return this.suburbControllerUpdateResponse(newSuburb, surburbId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerDeleteResponse(surburbId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/suburbs/${encodeURIComponent(String(surburbId))}`,
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
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerDelete(surburbId: string): __Observable<{}> {
    return this.suburbControllerDeleteResponse(surburbId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module SuburbControllerService {

  /**
   * Parameters for suburbControllerReadAll
   */
  export interface SuburbControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { SuburbControllerService }
