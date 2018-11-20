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
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @param dir undefined
   * @param filter undefined
   * @return OK
   */
  addressControllerFindAllResponse(page?: number,
    size?: number,
    sort?: string,
    dir?: string,
    filter?: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    if (size != null) __params = __params.set('size', size.toString());
    if (sort != null) __params = __params.set('sort', sort.toString());
    if (dir != null) __params = __params.set('dir', dir.toString());
    if (filter != null) __params = __params.set('filter', filter.toString());
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
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @param dir undefined
   * @param filter undefined
   * @return OK
   */
  addressControllerFindAll(page?: number,
    size?: number,
    sort?: string,
    dir?: string,
    filter?: string): Observable<{}> {
    return this.addressControllerFindAllResponse(page, size, sort, dir, filter).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newAddress newAddress
   * @return OK
   */
  addressControllerAddResponse(newAddress: AddressEntity): Observable<StrictHttpResponse<{}>> {
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
  addressControllerAdd(newAddress: AddressEntity): Observable<{}> {
    return this.addressControllerAddResponse(newAddress).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param addressId addressId
   * @return OK
   */
  addressControllerFindOneResponse(addressId: string): Observable<StrictHttpResponse<ResourceAddressEntity>> {
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
  addressControllerFindOne(addressId: string): Observable<ResourceAddressEntity> {
    return this.addressControllerFindOneResponse(addressId).pipe(
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
  addressControllerFindSuburbResponse(addressId: string): Observable<StrictHttpResponse<ResourceObject>> {
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
  addressControllerFindSuburb(addressId: string): Observable<ResourceObject> {
    return this.addressControllerFindSuburbResponse(addressId).pipe(
      __map(_r => _r.body as ResourceObject)
    );
  }

  /**
   * @param addressId addressId
   * @param suburbId suburbId
   * @return OK
   */
  addressControllerUpdateSuburbResponse(addressId: string,
    suburbId: string): Observable<StrictHttpResponse<ResourceObject>> {
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
    suburbId: string): Observable<ResourceObject> {
    return this.addressControllerUpdateSuburbResponse(addressId, suburbId).pipe(
      __map(_r => _r.body as ResourceObject)
    );
  }
}

module AddressControllerService {
}

export { AddressControllerService }
