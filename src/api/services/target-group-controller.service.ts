/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TargetGroupEntity } from '../models/target-group-entity';
import { ResourceTargetGroupEntity } from '../models/resource-target-group-entity';

/**
 * Target Group Controller
 */
@Injectable({
  providedIn: 'root',
})
class TargetGroupControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `TargetGroupControllerService.TargetGroupControllerFindAllParams` containing the following parameters:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `filter`:
   *
   * @return OK
   */
  targetGroupControllerFindAllResponse(params: TargetGroupControllerService.TargetGroupControllerFindAllParams): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
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
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param params The `TargetGroupControllerService.TargetGroupControllerFindAllParams` containing the following parameters:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `filter`:
   *
   * @return OK
   */
  targetGroupControllerFindAll(params: TargetGroupControllerService.TargetGroupControllerFindAllParams): Observable<{}> {
    return this.targetGroupControllerFindAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newTargetGroup newTargetGroup
   * @return OK
   */
  targetGroupControllerAddResponse(newTargetGroup: TargetGroupEntity): Observable<StrictHttpResponse<{}>> {
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
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newTargetGroup newTargetGroup
   * @return OK
   */
  targetGroupControllerAdd(newTargetGroup: TargetGroupEntity): Observable<{}> {
    return this.targetGroupControllerAddResponse(newTargetGroup).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerFindOneResponse(targetGroupId: string): Observable<StrictHttpResponse<ResourceTargetGroupEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/targetgroups/${targetGroupId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceTargetGroupEntity>;
      })
    );
  }
  /**
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerFindOne(targetGroupId: string): Observable<ResourceTargetGroupEntity> {
    return this.targetGroupControllerFindOneResponse(targetGroupId).pipe(
      __map(_r => _r.body as ResourceTargetGroupEntity)
    );
  }

  /**
   * @param newTargetGroup newTargetGroup
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerUpdateResponse(newTargetGroup: TargetGroupEntity,
    targetGroupId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newTargetGroup;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/targetgroups/${targetGroupId}`,
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
   * @param newTargetGroup newTargetGroup
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerUpdate(newTargetGroup: TargetGroupEntity,
    targetGroupId: string): Observable<{}> {
    return this.targetGroupControllerUpdateResponse(newTargetGroup, targetGroupId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerDeleteResponse(targetGroupId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/targetgroups/${targetGroupId}`,
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
   * @param targetGroupId targetGroupId
   * @return OK
   */
  targetGroupControllerDelete(targetGroupId: string): Observable<{}> {
    return this.targetGroupControllerDeleteResponse(targetGroupId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module TargetGroupControllerService {

  /**
   * Parameters for targetGroupControllerFindAll
   */
  export interface TargetGroupControllerFindAllParams {
    page?: number;
    size?: number;
    sort?: string;
    dir?: string;
    filter?: string;
  }
}

export { TargetGroupControllerService }
