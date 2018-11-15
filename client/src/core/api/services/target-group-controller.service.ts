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
   * @param dir undefined
   * @param filter undefined
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @return OK
   */
  targetGroupControllerFindAllResponse(dir?: string,
    filter?: string,
    page?: number,
    size?: number,
    sort?: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (dir != null) __params = __params.set('dir', dir.toString());
    if (filter != null) __params = __params.set('filter', filter.toString());
    if (page != null) __params = __params.set('page', page.toString());
    if (size != null) __params = __params.set('size', size.toString());
    if (sort != null) __params = __params.set('sort', sort.toString());
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
   * @param dir undefined
   * @param filter undefined
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @return OK
   */
  targetGroupControllerFindAll(dir?: string,
    filter?: string,
    page?: number,
    size?: number,
    sort?: string): Observable<{}> {
    return this.targetGroupControllerFindAllResponse(dir, filter, page, size, sort).pipe(
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
}

export { TargetGroupControllerService }
