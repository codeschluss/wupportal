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
   * @param dir undefined
   * @param filter undefined
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @return OK
   */
  organisationControllerFindAllResponse(dir?: string,
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
   * @param dir undefined
   * @param filter undefined
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @return OK
   */
  organisationControllerFindAll(dir?: string,
    filter?: string,
    page?: number,
    size?: number,
    sort?: string): Observable<{}> {
    return this.organisationControllerFindAllResponse(dir, filter, page, size, sort).pipe(
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
   * @param activityId activityId
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerDeleteActivityResponse(activityId: string,
    organisationId: string): Observable<StrictHttpResponse<{}>> {
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
   * @param activityId activityId
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerDeleteActivity(activityId: string,
    organisationId: string): Observable<{}> {
    return this.organisationControllerDeleteActivityResponse(activityId, organisationId).pipe(
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
   * @param addressId addressId
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerUpdateAddressResponse(addressId: string,
    organisationId: string): Observable<StrictHttpResponse<{}>> {
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
   * @param addressId addressId
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerUpdateAddress(addressId: string,
    organisationId: string): Observable<{}> {
    return this.organisationControllerUpdateAddressResponse(addressId, organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerFindUsersByOrganisationResponse(organisationId: string): Observable<StrictHttpResponse<{}>> {
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
  organisationControllerFindUsersByOrganisation(organisationId: string): Observable<{}> {
    return this.organisationControllerFindUsersByOrganisationResponse(organisationId).pipe(
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
   * @param isAdmin isAdmin
   * @param organisationId organisationId
   * @param userId userId
   * @return OK
   */
  organisationControllerGrantAdminRightResponse(isAdmin: boolean,
    organisationId: string,
    userId: string): Observable<StrictHttpResponse<{}>> {
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
   * @param isAdmin isAdmin
   * @param organisationId organisationId
   * @param userId userId
   * @return OK
   */
  organisationControllerGrantAdminRight(isAdmin: boolean,
    organisationId: string,
    userId: string): Observable<{}> {
    return this.organisationControllerGrantAdminRightResponse(isAdmin, organisationId, userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param isApproved isApproved
   * @param organisationId organisationId
   * @param userId userId
   * @return OK
   */
  organisationControllerApproveOrRejectUserResponse(isApproved: boolean,
    organisationId: string,
    userId: string): Observable<StrictHttpResponse<{}>> {
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
   * @param isApproved isApproved
   * @param organisationId organisationId
   * @param userId userId
   * @return OK
   */
  organisationControllerApproveOrRejectUser(isApproved: boolean,
    organisationId: string,
    userId: string): Observable<{}> {
    return this.organisationControllerApproveOrRejectUserResponse(isApproved, organisationId, userId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module OrganisationControllerService {
}

export { OrganisationControllerService }
