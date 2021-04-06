/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TargetGroupEntity } from '../models/target-group-entity';
import { ResourceTargetGroupEntity } from '../models/resource-target-group-entity';

/**
 * Target Group Controller
 */
@Injectable({
  providedIn: 'root',
})
class TargetGroupControllerService extends __BaseService {
  static readonly targetGroupControllerReadAllPath = '/targetgroups';
  static readonly targetGroupControllerCreatePath = '/targetgroups';
  static readonly targetGroupControllerReadOnePath = '/targetgroups/{targetGroupId}';
  static readonly targetGroupControllerUpdatePath = '/targetgroups/{targetGroupId}';
  static readonly targetGroupControllerDeletePath = '/targetgroups/{targetGroupId}';
  static readonly targetGroupControllerReadTranslationsPath = '/targetgroups/{targetGroupId}/translations';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `TargetGroupControllerService.TargetGroupControllerReadAllParams` containing the following parameters:
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
  targetGroupControllerReadAllResponse(params: TargetGroupControllerService.TargetGroupControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
      this.rootUrl + `/targetgroups`,
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
   * @param params The `TargetGroupControllerService.TargetGroupControllerReadAllParams` containing the following parameters:
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
  targetGroupControllerReadAll(params: TargetGroupControllerService.TargetGroupControllerReadAllParams): __Observable<{}> {
    return this.targetGroupControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newTargetGroup newTargetGroup
   * @return OK
   */
  targetGroupControllerCreateResponse(newTargetGroup: TargetGroupEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newTargetGroup;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/targetgroups`,
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
   * @param newTargetGroup newTargetGroup
   * @return OK
   */
  targetGroupControllerCreate(newTargetGroup: TargetGroupEntity): __Observable<{}> {
    return this.targetGroupControllerCreateResponse(newTargetGroup).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerReadOneResponse(targetGroupId: string): __Observable<__StrictHttpResponse<ResourceTargetGroupEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/targetgroups/${encodeURIComponent(String(targetGroupId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceTargetGroupEntity>;
      })
    );
  }
  /**
   * readOne
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerReadOne(targetGroupId: string): __Observable<ResourceTargetGroupEntity> {
    return this.targetGroupControllerReadOneResponse(targetGroupId).pipe(
      __map(_r => _r.body as ResourceTargetGroupEntity)
    );
  }

  /**
   * update
   * @param newTargetGroup newTargetGroup
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerUpdateResponse(newTargetGroup: TargetGroupEntity,
    targetGroupId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newTargetGroup;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/targetgroups/${encodeURIComponent(String(targetGroupId))}`,
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
   * @param newTargetGroup newTargetGroup
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerUpdate(newTargetGroup: TargetGroupEntity,
    targetGroupId: string): __Observable<{}> {
    return this.targetGroupControllerUpdateResponse(newTargetGroup, targetGroupId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerDeleteResponse(targetGroupId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/targetgroups/${encodeURIComponent(String(targetGroupId))}`,
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
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerDelete(targetGroupId: string): __Observable<{}> {
    return this.targetGroupControllerDeleteResponse(targetGroupId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerReadTranslationsResponse(targetGroupId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/targetgroups/${encodeURIComponent(String(targetGroupId))}/translations`,
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
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerReadTranslations(targetGroupId: string): __Observable<{}> {
    return this.targetGroupControllerReadTranslationsResponse(targetGroupId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module TargetGroupControllerService {

  /**
   * Parameters for targetGroupControllerReadAll
   */
  export interface TargetGroupControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { TargetGroupControllerService }
