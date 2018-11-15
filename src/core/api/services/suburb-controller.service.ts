/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { SuburbEntity } from '../models/suburb-entity';
import { ResourceSuburbEntity } from '../models/resource-suburb-entity';

/**
 * Suburb Controller
 */
@Injectable({
  providedIn: 'root',
})
class SuburbControllerService extends BaseService {
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
  suburbControllerFindAllResponse(dir?: string,
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
  suburbControllerFindAll(dir?: string,
    filter?: string,
    page?: number,
    size?: number,
    sort?: string): Observable<{}> {
    return this.suburbControllerFindAllResponse(dir, filter, page, size, sort).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newSuburb newSuburb
   * @return OK
   */
  suburbControllerAddResponse(newSuburb: SuburbEntity): Observable<StrictHttpResponse<{}>> {
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
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newSuburb newSuburb
   * @return OK
   */
  suburbControllerAdd(newSuburb: SuburbEntity): Observable<{}> {
    return this.suburbControllerAddResponse(newSuburb).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerFindOneResponse(surburbId: string): Observable<StrictHttpResponse<ResourceSuburbEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/suburbs/${surburbId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceSuburbEntity>;
      })
    );
  }
  /**
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerFindOne(surburbId: string): Observable<ResourceSuburbEntity> {
    return this.suburbControllerFindOneResponse(surburbId).pipe(
      __map(_r => _r.body as ResourceSuburbEntity)
    );
  }

  /**
   * @param newSuburb newSuburb
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerUpdateResponse(newSuburb: SuburbEntity,
    surburbId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newSuburb;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/suburbs/${surburbId}`,
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
   * @param newSuburb newSuburb
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerUpdate(newSuburb: SuburbEntity,
    surburbId: string): Observable<{}> {
    return this.suburbControllerUpdateResponse(newSuburb, surburbId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerDeleteResponse(surburbId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/suburbs/${surburbId}`,
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
   * @param surburbId surburbId
   * @return OK
   */
  suburbControllerDelete(surburbId: string): Observable<{}> {
    return this.suburbControllerDeleteResponse(surburbId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module SuburbControllerService {
}

export { SuburbControllerService }
