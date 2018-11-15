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
   * @param dir undefined
   * @param filter undefined
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @return OK
   */
  addressControllerFindAllResponse(dir?: string,
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
   * @param dir undefined
   * @param filter undefined
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @return OK
   */
  addressControllerFindAll(dir?: string,
    filter?: string,
    page?: number,
    size?: number,
    sort?: string): Observable<{}> {
    return this.addressControllerFindAllResponse(dir, filter, page, size, sort).pipe(
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
   * @param addressId addressId
   * @param newAddress newAddress
   * @return OK
   */
  addressControllerUpdateResponse(addressId: string,
    newAddress: AddressEntity): Observable<StrictHttpResponse<{}>> {
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
   * @param addressId addressId
   * @param newAddress newAddress
   * @return OK
   */
  addressControllerUpdate(addressId: string,
    newAddress: AddressEntity): Observable<{}> {
    return this.addressControllerUpdateResponse(addressId, newAddress).pipe(
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
