/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OrganisationEntity } from '../models/organisation-entity';
import { ResourceOrganisationEntity } from '../models/resource-organisation-entity';

/**
 * Organisation Controller
 */
@Injectable({
  providedIn: 'root',
})
class OrganisationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `OrganisationControllerService.OrganisationControllerFindAllParams` containing the following parameters:
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
  organisationControllerFindAllResponse(params: OrganisationControllerService.OrganisationControllerFindAllParams): Observable<StrictHttpResponse<{}>> {
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
      this.rootUrl + `/organisations`,
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
   * @param params The `OrganisationControllerService.OrganisationControllerFindAllParams` containing the following parameters:
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
  organisationControllerFindAll(params: OrganisationControllerService.OrganisationControllerFindAllParams): Observable<{}> {
    return this.organisationControllerFindAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newOrga newOrga
   * @return OK
   */
  organisationControllerAddResponse(newOrga: OrganisationEntity): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newOrga;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/organisations`,
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
   * @param newOrga newOrga
   * @return OK
   */
  organisationControllerAdd(newOrga: OrganisationEntity): Observable<{}> {
    return this.organisationControllerAddResponse(newOrga).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerFindOneResponse(organisationId: string): Observable<StrictHttpResponse<ResourceOrganisationEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${organisationId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceOrganisationEntity>;
      })
    );
  }
  /**
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerFindOne(organisationId: string): Observable<ResourceOrganisationEntity> {
    return this.organisationControllerFindOneResponse(organisationId).pipe(
      __map(_r => _r.body as ResourceOrganisationEntity)
    );
  }

  /**
   * @param newOrga newOrga
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerUpdateResponse(newOrga: OrganisationEntity,
    organisationId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newOrga;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${organisationId}`,
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
   * @param newOrga newOrga
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerUpdate(newOrga: OrganisationEntity,
    organisationId: string): Observable<{}> {
    return this.organisationControllerUpdateResponse(newOrga, organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerDeleteResponse(organisationId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${organisationId}`,
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
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerDelete(organisationId: string): Observable<{}> {
    return this.organisationControllerDeleteResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerFindActivitiesResponse(organisationId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${organisationId}/activities`,
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
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerFindActivities(organisationId: string): Observable<{}> {
    return this.organisationControllerFindActivitiesResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @param activityId activityId
   * @return OK
   */
  organisationControllerDeleteActivityResponse(organisationId: string,
    activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${organisationId}/activities/${activityId}`,
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
   * @param organisationId organisationId
   * @param activityId activityId
   * @return OK
   */
  organisationControllerDeleteActivity(organisationId: string,
    activityId: string): Observable<{}> {
    return this.organisationControllerDeleteActivityResponse(organisationId, activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerFindAddressResponse(organisationId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${organisationId}/address`,
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
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerFindAddress(organisationId: string): Observable<{}> {
    return this.organisationControllerFindAddressResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @param addressId addressId
   * @return OK
   */
  organisationControllerUpdateAddressResponse(organisationId: string,
    addressId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = addressId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${organisationId}/address`,
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
   * @param organisationId organisationId
   * @param addressId addressId
   * @return OK
   */
  organisationControllerUpdateAddress(organisationId: string,
    addressId: string): Observable<{}> {
    return this.organisationControllerUpdateAddressResponse(organisationId, addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerFindUsersResponse(organisationId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${organisationId}/users`,
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
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerFindUsers(organisationId: string): Observable<{}> {
    return this.organisationControllerFindUsersResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @param userId userId
   * @return OK
   */
  organisationControllerDeleteUserResponse(organisationId: string,
    userId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${organisationId}/users/${userId}`,
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
   * @param organisationId organisationId
   * @param userId userId
   * @return OK
   */
  organisationControllerDeleteUser(organisationId: string,
    userId: string): Observable<{}> {
    return this.organisationControllerDeleteUserResponse(organisationId, userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @param userId userId
   * @param isAdmin isAdmin
   * @return OK
   */
  organisationControllerGrantAdminRightResponse(organisationId: string,
    userId: string,
    isAdmin: boolean): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = isAdmin;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${organisationId}/users/${userId}/admin`,
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
   * @param organisationId organisationId
   * @param userId userId
   * @param isAdmin isAdmin
   * @return OK
   */
  organisationControllerGrantAdminRight(organisationId: string,
    userId: string,
    isAdmin: boolean): Observable<{}> {
    return this.organisationControllerGrantAdminRightResponse(organisationId, userId, isAdmin).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @param userId userId
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerApproveOrRejectUserResponse(organisationId: string,
    userId: string,
    isApproved: boolean): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = isApproved;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${organisationId}/users/${userId}/approve`,
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
   * @param organisationId organisationId
   * @param userId userId
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerApproveOrRejectUser(organisationId: string,
    userId: string,
    isApproved: boolean): Observable<{}> {
    return this.organisationControllerApproveOrRejectUserResponse(organisationId, userId, isApproved).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module OrganisationControllerService {

  /**
   * Parameters for organisationControllerFindAll
   */
  export interface OrganisationControllerFindAllParams {
    page?: number;
    size?: number;
    sort?: string;
    dir?: string;
    filter?: string;
  }
}

export { OrganisationControllerService }
