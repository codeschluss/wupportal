/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { SubscriptionTypeEntity } from '../models/subscription-type-entity';
import { ResourceSubscriptionTypeEntity } from '../models/resource-subscription-type-entity';

/**
 * Subscription Type Controller
 */
@Injectable({
  providedIn: 'root',
})
class SubscriptionTypeControllerService extends __BaseService {
  static readonly subscriptionTypeControllerReadAllPath = '/subscriptiontypes';
  static readonly subscriptionTypeControllerCreatePath = '/subscriptiontypes';
  static readonly subscriptionTypeControllerReadOnePath = '/subscriptiontypes/{subscriptionId}';
  static readonly subscriptionTypeControllerUpdatePath = '/subscriptiontypes/{subscriptionTypeId}';
  static readonly subscriptionTypeControllerDeletePath = '/subscriptiontypes/{subscriptionTypeId}';
  static readonly subscriptionTypeControllerReadTranslationsPath = '/subscriptiontypes/{subscriptionTypeId}/translations';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `SubscriptionTypeControllerService.SubscriptionTypeControllerReadAllParams` containing the following parameters:
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
  subscriptionTypeControllerReadAllResponse(params: SubscriptionTypeControllerService.SubscriptionTypeControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
      this.rootUrl + `/subscriptiontypes`,
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
   * @param params The `SubscriptionTypeControllerService.SubscriptionTypeControllerReadAllParams` containing the following parameters:
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
  subscriptionTypeControllerReadAll(params: SubscriptionTypeControllerService.SubscriptionTypeControllerReadAllParams): __Observable<{}> {
    return this.subscriptionTypeControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newSubscriptionType newSubscriptionType
   * @return OK
   */
  subscriptionTypeControllerCreateResponse(newSubscriptionType: SubscriptionTypeEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newSubscriptionType;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/subscriptiontypes`,
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
   * @param newSubscriptionType newSubscriptionType
   * @return OK
   */
  subscriptionTypeControllerCreate(newSubscriptionType: SubscriptionTypeEntity): __Observable<{}> {
    return this.subscriptionTypeControllerCreateResponse(newSubscriptionType).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionTypeControllerReadOneResponse(subscriptionId: string): __Observable<__StrictHttpResponse<ResourceSubscriptionTypeEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/subscriptiontypes/${encodeURIComponent(String(subscriptionId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceSubscriptionTypeEntity>;
      })
    );
  }
  /**
   * readOne
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionTypeControllerReadOne(subscriptionId: string): __Observable<ResourceSubscriptionTypeEntity> {
    return this.subscriptionTypeControllerReadOneResponse(subscriptionId).pipe(
      __map(_r => _r.body as ResourceSubscriptionTypeEntity)
    );
  }

  /**
   * update
   * @param newSubscriptionType newSubscriptionType
   * @param subscriptionTypeId subscriptionTypeId
   * @return OK
   */
  subscriptionTypeControllerUpdateResponse(newSubscriptionType: SubscriptionTypeEntity,
    subscriptionTypeId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newSubscriptionType;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/subscriptiontypes/${encodeURIComponent(String(subscriptionTypeId))}`,
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
   * @param newSubscriptionType newSubscriptionType
   * @param subscriptionTypeId subscriptionTypeId
   * @return OK
   */
  subscriptionTypeControllerUpdate(newSubscriptionType: SubscriptionTypeEntity,
    subscriptionTypeId: string): __Observable<{}> {
    return this.subscriptionTypeControllerUpdateResponse(newSubscriptionType, subscriptionTypeId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param subscriptionTypeId subscriptionTypeId
   * @return OK
   */
  subscriptionTypeControllerDeleteResponse(subscriptionTypeId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/subscriptiontypes/${encodeURIComponent(String(subscriptionTypeId))}`,
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
   * @param subscriptionTypeId subscriptionTypeId
   * @return OK
   */
  subscriptionTypeControllerDelete(subscriptionTypeId: string): __Observable<{}> {
    return this.subscriptionTypeControllerDeleteResponse(subscriptionTypeId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param subscriptionTypeId subscriptionTypeId
   * @return OK
   */
  subscriptionTypeControllerReadTranslationsResponse(subscriptionTypeId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/subscriptiontypes/${encodeURIComponent(String(subscriptionTypeId))}/translations`,
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
   * @param subscriptionTypeId subscriptionTypeId
   * @return OK
   */
  subscriptionTypeControllerReadTranslations(subscriptionTypeId: string): __Observable<{}> {
    return this.subscriptionTypeControllerReadTranslationsResponse(subscriptionTypeId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module SubscriptionTypeControllerService {

  /**
   * Parameters for subscriptionTypeControllerReadAll
   */
  export interface SubscriptionTypeControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { SubscriptionTypeControllerService }
