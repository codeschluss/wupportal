/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AddressEntity } from '../models/address-entity';
import { ResourceAddressEntity } from '../models/resource-address-entity';
import { ResourceObject } from '../models/resource-object';
import { StringPrimitive } from '../models/string-primitive';

/**
 * Address Controller
 */
@Injectable({
  providedIn: 'root',
})
class AddressControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `AddressControllerService.AddressControllerReadAllParams` containing the following parameters:
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
  addressControllerReadAllResponse(params: AddressControllerService.AddressControllerReadAllParams): Observable<StrictHttpResponse<{}>> {
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
      this.rootUrl + `/addresses`,
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
   * @param params The `AddressControllerService.AddressControllerReadAllParams` containing the following parameters:
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
  addressControllerReadAll(params: AddressControllerService.AddressControllerReadAllParams): Observable<{}> {
    return this.addressControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newAddress newAddress
   * @return OK
   */
  addressControllerCreateResponse(newAddress: AddressEntity): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newAddress;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/addresses`,
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
   * @param newAddress newAddress
   * @return OK
   */
  addressControllerCreate(newAddress: AddressEntity): Observable<{}> {
    return this.addressControllerCreateResponse(newAddress).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadOneResponse(addressId: string): Observable<StrictHttpResponse<ResourceAddressEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/addresses/${addressId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceAddressEntity>;
      })
    );
  }
  /**
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadOne(addressId: string): Observable<ResourceAddressEntity> {
    return this.addressControllerReadOneResponse(addressId).pipe(
      __map(_r => _r.body as ResourceAddressEntity)
    );
  }

  /**
   * @param newAddress newAddress
   * @param addressId addressId
   * @return OK
   */
  addressControllerUpdateResponse(newAddress: AddressEntity,
    addressId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newAddress;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/addresses/${addressId}`,
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
   * @param newAddress newAddress
   * @param addressId addressId
   * @return OK
   */
  addressControllerUpdate(newAddress: AddressEntity,
    addressId: string): Observable<{}> {
    return this.addressControllerUpdateResponse(newAddress, addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param addressId addressId
   * @return OK
   */
  addressControllerDeleteResponse(addressId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/addresses/${addressId}`,
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
   * @param addressId addressId
   * @return OK
   */
  addressControllerDelete(addressId: string): Observable<{}> {
    return this.addressControllerDeleteResponse(addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadSuburbResponse(addressId: string): Observable<StrictHttpResponse<ResourceObject>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/addresses/${addressId}/suburb`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceObject>;
      })
    );
  }
  /**
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadSuburb(addressId: string): Observable<ResourceObject> {
    return this.addressControllerReadSuburbResponse(addressId).pipe(
      __map(_r => _r.body as ResourceObject)
    );
  }

  /**
   * @param addressId addressId
   * @param suburbId suburbId
   * @return OK
   */
  addressControllerUpdateSuburbResponse(addressId: string,
    suburbId: StringPrimitive): Observable<StrictHttpResponse<ResourceObject>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = suburbId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/addresses/${addressId}/suburb`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceObject>;
      })
    );
  }
  /**
   * @param addressId addressId
   * @param suburbId suburbId
   * @return OK
   */
  addressControllerUpdateSuburb(addressId: string,
    suburbId: StringPrimitive): Observable<ResourceObject> {
    return this.addressControllerUpdateSuburbResponse(addressId, suburbId).pipe(
      __map(_r => _r.body as ResourceObject)
    );
  }
}

module AddressControllerService {

  /**
   * Parameters for addressControllerReadAll
   */
  export interface AddressControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { AddressControllerService }
