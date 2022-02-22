/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AddressEntity } from '../models/address-entity';
import { ResourceAddressEntity } from '../models/resource-address-entity';
import { ResourcesObject } from '../models/resources-object';
import { ResourceObject } from '../models/resource-object';
import { StringPrimitive } from '../models/string-primitive';

/**
 * Address Controller
 */
@Injectable({
  providedIn: 'root',
})
class AddressControllerService extends __BaseService {
  static readonly addressControllerReadAllPath = '/addresses';
  static readonly addressControllerCreatePath = '/addresses';
  static readonly addressControllerLookupPath = '/addresses/lookup';
  static readonly addressControllerReadOnePath = '/addresses/{addressId}';
  static readonly addressControllerUpdatePath = '/addresses/{addressId}';
  static readonly addressControllerDeletePath = '/addresses/{addressId}';
  static readonly addressControllerReadActivitiesPath = '/addresses/{addressId}/activities';
  static readonly addressControllerReadOrganisationsPath = '/addresses/{addressId}/organisations';
  static readonly addressControllerReadSuburbPath = '/addresses/{addressId}/suburb';
  static readonly addressControllerUpdateSuburbPath = '/addresses/{addressId}/suburb';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
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
  addressControllerReadAllResponse(params: AddressControllerService.AddressControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readAll
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
  addressControllerReadAll(params: AddressControllerService.AddressControllerReadAllParams): __Observable<{}> {
    return this.addressControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newAddress newAddress
   * @return OK
   */
  addressControllerCreateResponse(newAddress: AddressEntity): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * create
   * @param newAddress newAddress
   * @return OK
   */
  addressControllerCreate(newAddress: AddressEntity): __Observable<{}> {
    return this.addressControllerCreateResponse(newAddress).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * lookup
   * @param address address
   * @return OK
   */
  addressControllerLookupResponse(address: AddressEntity): __Observable<__StrictHttpResponse<AddressEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = address;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/addresses/lookup`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AddressEntity>;
      })
    );
  }
  /**
   * lookup
   * @param address address
   * @return OK
   */
  addressControllerLookup(address: AddressEntity): __Observable<AddressEntity> {
    return this.addressControllerLookupResponse(address).pipe(
      __map(_r => _r.body as AddressEntity)
    );
  }

  /**
   * readOne
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadOneResponse(addressId: string): __Observable<__StrictHttpResponse<ResourceAddressEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/addresses/${encodeURIComponent(String(addressId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceAddressEntity>;
      })
    );
  }
  /**
   * readOne
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadOne(addressId: string): __Observable<ResourceAddressEntity> {
    return this.addressControllerReadOneResponse(addressId).pipe(
      __map(_r => _r.body as ResourceAddressEntity)
    );
  }

  /**
   * update
   * @param newAddress newAddress
   * @param addressId addressId
   * @return OK
   */
  addressControllerUpdateResponse(newAddress: AddressEntity,
    addressId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newAddress;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/addresses/${encodeURIComponent(String(addressId))}`,
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
   * @param newAddress newAddress
   * @param addressId addressId
   * @return OK
   */
  addressControllerUpdate(newAddress: AddressEntity,
    addressId: string): __Observable<{}> {
    return this.addressControllerUpdateResponse(newAddress, addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param addressId addressId
   * @return OK
   */
  addressControllerDeleteResponse(addressId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/addresses/${encodeURIComponent(String(addressId))}`,
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
   * @param addressId addressId
   * @return OK
   */
  addressControllerDelete(addressId: string): __Observable<{}> {
    return this.addressControllerDeleteResponse(addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readActivities
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadActivitiesResponse(addressId: string): __Observable<__StrictHttpResponse<ResourcesObject>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/addresses/${encodeURIComponent(String(addressId))}/activities`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourcesObject>;
      })
    );
  }
  /**
   * readActivities
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadActivities(addressId: string): __Observable<ResourcesObject> {
    return this.addressControllerReadActivitiesResponse(addressId).pipe(
      __map(_r => _r.body as ResourcesObject)
    );
  }

  /**
   * readOrganisations
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadOrganisationsResponse(addressId: string): __Observable<__StrictHttpResponse<ResourcesObject>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/addresses/${encodeURIComponent(String(addressId))}/organisations`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourcesObject>;
      })
    );
  }
  /**
   * readOrganisations
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadOrganisations(addressId: string): __Observable<ResourcesObject> {
    return this.addressControllerReadOrganisationsResponse(addressId).pipe(
      __map(_r => _r.body as ResourcesObject)
    );
  }

  /**
   * readSuburb
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadSuburbResponse(addressId: string): __Observable<__StrictHttpResponse<ResourceObject>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/addresses/${encodeURIComponent(String(addressId))}/suburb`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceObject>;
      })
    );
  }
  /**
   * readSuburb
   * @param addressId addressId
   * @return OK
   */
  addressControllerReadSuburb(addressId: string): __Observable<ResourceObject> {
    return this.addressControllerReadSuburbResponse(addressId).pipe(
      __map(_r => _r.body as ResourceObject)
    );
  }

  /**
   * updateSuburb
   * @param addressId addressId
   * @param suburbId suburbId
   * @return OK
   */
  addressControllerUpdateSuburbResponse(addressId: string,
    suburbId: StringPrimitive): __Observable<__StrictHttpResponse<ResourceObject>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = suburbId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/addresses/${encodeURIComponent(String(addressId))}/suburb`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceObject>;
      })
    );
  }
  /**
   * updateSuburb
   * @param addressId addressId
   * @param suburbId suburbId
   * @return OK
   */
  addressControllerUpdateSuburb(addressId: string,
    suburbId: StringPrimitive): __Observable<ResourceObject> {
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
