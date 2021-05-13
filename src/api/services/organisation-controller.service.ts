/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OrganisationEntity } from '../models/organisation-entity';
import { ResourceOrganisationEntity } from '../models/resource-organisation-entity';
import { StringPrimitive } from '../models/string-primitive';
import { BooleanPrimitive } from '../models/boolean-primitive';
import { ImageEntity } from '../models/image-entity';
import { VideoEntity } from '../models/video-entity';

/**
 * Organisation Controller
 */
@Injectable({
  providedIn: 'root',
})
class OrganisationControllerService extends __BaseService {
  static readonly organisationControllerReadAllPath = '/organisations';
  static readonly organisationControllerCreatePath = '/organisations';
  static readonly organisationControllerReadOnePath = '/organisations/{organisationId}';
  static readonly organisationControllerUpdatePath = '/organisations/{organisationId}';
  static readonly organisationControllerDeletePath = '/organisations/{organisationId}';
  static readonly organisationControllerReadActivitiesPath = '/organisations/{organisationId}/activities';
  static readonly organisationControllerDeleteActivityPath = '/organisations/{organisationId}/activities/{activityId}';
  static readonly organisationControllerReadAddressPath = '/organisations/{organisationId}/address';
  static readonly organisationControllerUpdateAddressPath = '/organisations/{organisationId}/address';
  static readonly organisationControllerGrantApprovalPath = '/organisations/{organisationId}/approve';
  static readonly organisationControllerReadImagesPath = '/organisations/{organisationId}/images';
  static readonly organisationControllerAddImagePath = '/organisations/{organisationId}/images';
  static readonly organisationControllerDeleteImagesPath = '/organisations/{organisationId}/images';
  static readonly organisationControllerIncreaseLikePath = '/organisations/{organisationId}/like';
  static readonly organisationControllerReadTranslationsPath = '/organisations/{organisationId}/translations';
  static readonly organisationControllerReadUsersPath = '/organisations/{organisationId}/users';
  static readonly organisationControllerDeleteUserPath = '/organisations/{organisationId}/users/{userId}';
  static readonly organisationControllerGrantAdminRightPath = '/organisations/{organisationId}/users/{userId}/admin';
  static readonly organisationControllerApproveOrRejectUserPath = '/organisations/{organisationId}/users/{userId}/approve';
  static readonly organisationControllerReadVideosPath = '/organisations/{organisationId}/videos';
  static readonly organisationControllerAddVideosPath = '/organisations/{organisationId}/videos';
  static readonly organisationControllerDeleteVideosPath = '/organisations/{organisationId}/videos';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
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
  organisationControllerReadAllResponse(params: OrganisationControllerService.OrganisationControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readAll
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
  organisationControllerReadAll(params: OrganisationControllerService.OrganisationControllerReadAllParams): __Observable<{}> {
    return this.organisationControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newOrga newOrga
   * @return OK
   */
  organisationControllerCreateResponse(newOrga: OrganisationEntity): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * create
   * @param newOrga newOrga
   * @return OK
   */
  organisationControllerCreate(newOrga: OrganisationEntity): __Observable<{}> {
    return this.organisationControllerCreateResponse(newOrga).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadOneResponse(organisationId: string): __Observable<__StrictHttpResponse<ResourceOrganisationEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceOrganisationEntity>;
      })
    );
  }
  /**
   * readOne
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadOne(organisationId: string): __Observable<ResourceOrganisationEntity> {
    return this.organisationControllerReadOneResponse(organisationId).pipe(
      __map(_r => _r.body as ResourceOrganisationEntity)
    );
  }

  /**
   * update
   * @param newOrga newOrga
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerUpdateResponse(newOrga: OrganisationEntity,
    organisationId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newOrga;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}`,
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
   * @param newOrga newOrga
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerUpdate(newOrga: OrganisationEntity,
    organisationId: string): __Observable<{}> {
    return this.organisationControllerUpdateResponse(newOrga, organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerDeleteResponse(organisationId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}`,
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
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerDelete(organisationId: string): __Observable<{}> {
    return this.organisationControllerDeleteResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readActivities
   * @param organisationId organisationId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  organisationControllerReadActivitiesResponse(organisationId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (sort != null) __params = __params.set('sort', sort.toString());
    if (dir != null) __params = __params.set('dir', dir.toString());
    if (embeddings != null) __params = __params.set('embeddings', embeddings.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/activities`,
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
   * readActivities
   * @param organisationId organisationId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  organisationControllerReadActivities(organisationId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.organisationControllerReadActivitiesResponse(organisationId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteActivity
   * @param organisationId organisationId
   * @param activityId activityId
   * @return OK
   */
  organisationControllerDeleteActivityResponse(organisationId: string,
    activityId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/activities/${encodeURIComponent(String(activityId))}`,
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
   * deleteActivity
   * @param organisationId organisationId
   * @param activityId activityId
   * @return OK
   */
  organisationControllerDeleteActivity(organisationId: string,
    activityId: string): __Observable<{}> {
    return this.organisationControllerDeleteActivityResponse(organisationId, activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readAddress
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadAddressResponse(organisationId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/address`,
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
   * readAddress
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadAddress(organisationId: string): __Observable<{}> {
    return this.organisationControllerReadAddressResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * updateAddress
   * @param organisationId organisationId
   * @param addressId addressId
   * @return OK
   */
  organisationControllerUpdateAddressResponse(organisationId: string,
    addressId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = addressId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/address`,
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
   * updateAddress
   * @param organisationId organisationId
   * @param addressId addressId
   * @return OK
   */
  organisationControllerUpdateAddress(organisationId: string,
    addressId: StringPrimitive): __Observable<{}> {
    return this.organisationControllerUpdateAddressResponse(organisationId, addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * grantApproval
   * @param organisationId organisationId
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerGrantApprovalResponse(organisationId: string,
    isApproved: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isApproved;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/approve`,
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
   * grantApproval
   * @param organisationId organisationId
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerGrantApproval(organisationId: string,
    isApproved: BooleanPrimitive): __Observable<{}> {
    return this.organisationControllerGrantApprovalResponse(organisationId, isApproved).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readImages
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadImagesResponse(organisationId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/images`,
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
   * readImages
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadImages(organisationId: string): __Observable<{}> {
    return this.organisationControllerReadImagesResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addImage
   * @param organisationId organisationId
   * @param images images
   * @return OK
   */
  organisationControllerAddImageResponse(organisationId: string,
    images: Array<ImageEntity>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = images;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/images`,
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
   * addImage
   * @param organisationId organisationId
   * @param images images
   * @return OK
   */
  organisationControllerAddImage(organisationId: string,
    images: Array<ImageEntity>): __Observable<{}> {
    return this.organisationControllerAddImageResponse(organisationId, images).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteImages
   * @param organisationId organisationId
   * @param imageIds imageIds
   * @return OK
   */
  organisationControllerDeleteImagesResponse(organisationId: string,
    imageIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (imageIds || []).forEach(val => {if (val != null) __params = __params.append('imageIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/images`,
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
   * deleteImages
   * @param organisationId organisationId
   * @param imageIds imageIds
   * @return OK
   */
  organisationControllerDeleteImages(organisationId: string,
    imageIds: Array<string>): __Observable<{}> {
    return this.organisationControllerDeleteImagesResponse(organisationId, imageIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * increaseLike
   * @param organisationId organisationId
   * @param subscriptionId subscriptionId
   * @return OK
   */
  organisationControllerIncreaseLikeResponse(organisationId: string,
    subscriptionId?: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = subscriptionId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/like`,
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
   * increaseLike
   * @param organisationId organisationId
   * @param subscriptionId subscriptionId
   * @return OK
   */
  organisationControllerIncreaseLike(organisationId: string,
    subscriptionId?: StringPrimitive): __Observable<{}> {
    return this.organisationControllerIncreaseLikeResponse(organisationId, subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadTranslationsResponse(organisationId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/translations`,
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
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadTranslations(organisationId: string): __Observable<{}> {
    return this.organisationControllerReadTranslationsResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readUsers
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadUsersResponse(organisationId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/users`,
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
   * readUsers
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadUsers(organisationId: string): __Observable<{}> {
    return this.organisationControllerReadUsersResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteUser
   * @param organisationId organisationId
   * @param userId userId
   * @return OK
   */
  organisationControllerDeleteUserResponse(organisationId: string,
    userId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/users/${encodeURIComponent(String(userId))}`,
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
   * deleteUser
   * @param organisationId organisationId
   * @param userId userId
   * @return OK
   */
  organisationControllerDeleteUser(organisationId: string,
    userId: string): __Observable<{}> {
    return this.organisationControllerDeleteUserResponse(organisationId, userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * grantAdminRight
   * @param organisationId organisationId
   * @param userId userId
   * @param isAdmin isAdmin
   * @return OK
   */
  organisationControllerGrantAdminRightResponse(organisationId: string,
    userId: string,
    isAdmin: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = isAdmin;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/users/${encodeURIComponent(String(userId))}/admin`,
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
   * grantAdminRight
   * @param organisationId organisationId
   * @param userId userId
   * @param isAdmin isAdmin
   * @return OK
   */
  organisationControllerGrantAdminRight(organisationId: string,
    userId: string,
    isAdmin: BooleanPrimitive): __Observable<{}> {
    return this.organisationControllerGrantAdminRightResponse(organisationId, userId, isAdmin).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * approveOrRejectUser
   * @param organisationId organisationId
   * @param userId userId
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerApproveOrRejectUserResponse(organisationId: string,
    userId: string,
    isApproved: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = isApproved;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/users/${encodeURIComponent(String(userId))}/approve`,
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
   * approveOrRejectUser
   * @param organisationId organisationId
   * @param userId userId
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerApproveOrRejectUser(organisationId: string,
    userId: string,
    isApproved: BooleanPrimitive): __Observable<{}> {
    return this.organisationControllerApproveOrRejectUserResponse(organisationId, userId, isApproved).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readVideos
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadVideosResponse(organisationId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/videos`,
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
   * readVideos
   * @param organisationId organisationId
   * @return OK
   */
  organisationControllerReadVideos(organisationId: string): __Observable<{}> {
    return this.organisationControllerReadVideosResponse(organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addVideos
   * @param organisationId organisationId
   * @param videos videos
   * @return OK
   */
  organisationControllerAddVideosResponse(organisationId: string,
    videos: Array<VideoEntity>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = videos;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/videos`,
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
   * addVideos
   * @param organisationId organisationId
   * @param videos videos
   * @return OK
   */
  organisationControllerAddVideos(organisationId: string,
    videos: Array<VideoEntity>): __Observable<{}> {
    return this.organisationControllerAddVideosResponse(organisationId, videos).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteVideos
   * @param organisationId organisationId
   * @param videoIds videoIds
   * @return OK
   */
  organisationControllerDeleteVideosResponse(organisationId: string,
    videoIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (videoIds || []).forEach(val => {if (val != null) __params = __params.append('videoIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${encodeURIComponent(String(organisationId))}/videos`,
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
   * deleteVideos
   * @param organisationId organisationId
   * @param videoIds videoIds
   * @return OK
   */
  organisationControllerDeleteVideos(organisationId: string,
    videoIds: Array<string>): __Observable<{}> {
    return this.organisationControllerDeleteVideosResponse(organisationId, videoIds).pipe(
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
