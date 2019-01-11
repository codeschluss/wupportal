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
import { StringPrimitive } from '../models/string-primitive';
import { BooleanPrimitive } from '../models/boolean-primitive';
import { OrganisationImageEntity } from '../models/organisation-image-entity';

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
   * @param params The `OrganisationControllerService.OrganisationControllerReadAllParams` containing the following parameters:
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
   * - `approved`:
   *
   * @return OK
   */
  organisationControllerReadAllResponse(params: OrganisationControllerService.OrganisationControllerReadAllParams): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
    if (params.embeddings != null) __params = __params.set('embeddings', params.embeddings.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.filter != null) __params = __params.set('filter', params.filter.toString());
    if (params.approved != null) __params = __params.set('approved', params.approved.toString());
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
   * @param params The `OrganisationControllerService.OrganisationControllerReadAllParams` containing the following parameters:
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
   * - `approved`:
   *
   * @return OK
   */
  organisationControllerReadAll(params: OrganisationControllerService.OrganisationControllerReadAllParams): Observable<{}> {
    return this.organisationControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newOrga newOrga
   * @return OK
   */
  organisationControllerCreateResponse(newOrga: OrganisationEntity): Observable<StrictHttpResponse<{}>> {
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
  organisationControllerCreate(newOrga: OrganisationEntity): Observable<{}> {
    return this.organisationControllerCreateResponse(newOrga).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadOneResponse(organisationId: string): Observable<StrictHttpResponse<ResourceOrganisationEntity>> {
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
  organisationControllerReadOne(organisationId: string): Observable<ResourceOrganisationEntity> {
    return this.organisationControllerReadOneResponse(organisationId).pipe(
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
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  organisationControllerReadActivitiesResponse(organisationId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (sort != null) __params = __params.set('sort', sort.toString());
    if (dir != null) __params = __params.set('dir', dir.toString());
    if (embeddings != null) __params = __params.set('embeddings', embeddings.toString());
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
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  organisationControllerReadActivities(organisationId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): Observable<{}> {
    return this.organisationControllerReadActivitiesResponse(organisationId, sort, dir, embeddings).pipe(
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
  organisationControllerReadAddressResponse(organisationId: string): Observable<StrictHttpResponse<{}>> {
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
  organisationControllerReadAddress(organisationId: string): Observable<{}> {
    return this.organisationControllerReadAddressResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @param addressId addressId
   * @return OK
   */
  organisationControllerUpdateAddressResponse(organisationId: string,
    addressId: StringPrimitive): Observable<StrictHttpResponse<{}>> {
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
    addressId: StringPrimitive): Observable<{}> {
    return this.organisationControllerUpdateAddressResponse(organisationId, addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerGrantApprovalResponse(organisationId: string,
    isApproved: BooleanPrimitive): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isApproved;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${organisationId}/approve`,
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
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerGrantApproval(organisationId: string,
    isApproved: BooleanPrimitive): Observable<{}> {
    return this.organisationControllerGrantApprovalResponse(organisationId, isApproved).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadImagesResponse(organisationId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${organisationId}/images`,
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
  organisationControllerReadImages(organisationId: string): Observable<{}> {
    return this.organisationControllerReadImagesResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @param image image
   * @return OK
   */
  organisationControllerAddImageResponse(organisationId: string,
    image: Array<OrganisationImageEntity>): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = image;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/organisations/${organisationId}/images`,
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
   * @param image image
   * @return OK
   */
  organisationControllerAddImage(organisationId: string,
    image: Array<OrganisationImageEntity>): Observable<{}> {
    return this.organisationControllerAddImageResponse(organisationId, image).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @param imageId imageId
   * @return OK
   */
  organisationControllerDeleteImagesResponse(organisationId: string,
    imageId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${organisationId}/images/${imageId}`,
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
   * @param imageId imageId
   * @return OK
   */
  organisationControllerDeleteImages(organisationId: string,
    imageId: string): Observable<{}> {
    return this.organisationControllerDeleteImagesResponse(organisationId, imageId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadTranslationsResponse(organisationId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${organisationId}/translations`,
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
  organisationControllerReadTranslations(organisationId: string): Observable<{}> {
    return this.organisationControllerReadTranslationsResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param organisationId organisationId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  organisationControllerReadUsersResponse(organisationId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (sort != null) __params = __params.set('sort', sort.toString());
    if (dir != null) __params = __params.set('dir', dir.toString());
    if (embeddings != null) __params = __params.set('embeddings', embeddings.toString());
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
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  organisationControllerReadUsers(organisationId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): Observable<{}> {
    return this.organisationControllerReadUsersResponse(organisationId, sort, dir, embeddings).pipe(
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
    isAdmin: BooleanPrimitive): Observable<StrictHttpResponse<{}>> {
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
    isAdmin: BooleanPrimitive): Observable<{}> {
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
    isApproved: BooleanPrimitive): Observable<StrictHttpResponse<{}>> {
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
    isApproved: BooleanPrimitive): Observable<{}> {
    return this.organisationControllerApproveOrRejectUserResponse(organisationId, userId, isApproved).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module OrganisationControllerService {

  /**
   * Parameters for organisationControllerReadAll
   */
  export interface OrganisationControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
    approved?: boolean;
  }
}

export { OrganisationControllerService }
