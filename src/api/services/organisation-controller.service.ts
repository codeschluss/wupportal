/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OrganisationEntity } from '../models/organisation-entity';
import { VisitableEntityObject } from '../models/visitable-entity-object';
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
  static readonly organisationControllerCalculateOverviewVisitorsPath = '/organisations/visitors';
  static readonly organisationControllerReadOnePath = '/organisations/{id}';
  static readonly organisationControllerUpdatePath = '/organisations/{id}';
  static readonly organisationControllerDeletePath = '/organisations/{id}';
  static readonly organisationControllerReadActivitiesPath = '/organisations/{id}/activities';
  static readonly organisationControllerDeleteActivityPath = '/organisations/{id}/activities/{activityId}';
  static readonly organisationControllerReadAddressPath = '/organisations/{id}/address';
  static readonly organisationControllerUpdateAddressPath = '/organisations/{id}/address';
  static readonly organisationControllerGrantApprovalPath = '/organisations/{id}/approve';
  static readonly organisationControllerReadAvatarPath = '/organisations/{id}/avatar';
  static readonly organisationControllerAddAvatarPath = '/organisations/{id}/avatar';
  static readonly organisationControllerReadImagesPath = '/organisations/{id}/images';
  static readonly organisationControllerAddImagePath = '/organisations/{id}/images';
  static readonly organisationControllerDeleteImagesPath = '/organisations/{id}/images';
  static readonly organisationControllerIncreaseLikePath = '/organisations/{id}/like';
  static readonly organisationControllerReadTranslationsPath = '/organisations/{id}/translations';
  static readonly organisationControllerReadUsersPath = '/organisations/{id}/users';
  static readonly organisationControllerDeleteUserPath = '/organisations/{id}/users/{userId}';
  static readonly organisationControllerGrantAdminRightPath = '/organisations/{id}/users/{userId}/admin';
  static readonly organisationControllerApproveOrRejectUserPath = '/organisations/{id}/users/{userId}/approve';
  static readonly organisationControllerReadVideosPath = '/organisations/{id}/videos';
  static readonly organisationControllerAddVideosPath = '/organisations/{id}/videos';
  static readonly organisationControllerDeleteVideosPath = '/organisations/{id}/videos';
  static readonly organisationControllerCalculateVisitorsPath = '/organisations/{id}/visitors';

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
   * calculateOverviewVisitors
   * @return OK
   */
  organisationControllerCalculateOverviewVisitorsResponse(): __Observable<__StrictHttpResponse<Array<VisitableEntityObject>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/visitors`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VisitableEntityObject>>;
      })
    );
  }
  /**
   * calculateOverviewVisitors
   * @return OK
   */
  organisationControllerCalculateOverviewVisitors(): __Observable<Array<VisitableEntityObject>> {
    return this.organisationControllerCalculateOverviewVisitorsResponse().pipe(
      __map(_r => _r.body as Array<VisitableEntityObject>)
    );
  }

  /**
   * readOne
   * @param id id
   * @return OK
   */
  organisationControllerReadOneResponse(id: string): __Observable<__StrictHttpResponse<ResourceOrganisationEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}`,
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
   * @param id id
   * @return OK
   */
  organisationControllerReadOne(id: string): __Observable<ResourceOrganisationEntity> {
    return this.organisationControllerReadOneResponse(id).pipe(
      __map(_r => _r.body as ResourceOrganisationEntity)
    );
  }

  /**
   * update
   * @param newOrga newOrga
   * @param id id
   * @return OK
   */
  organisationControllerUpdateResponse(newOrga: OrganisationEntity,
    id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newOrga;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}`,
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
   * @param id id
   * @return OK
   */
  organisationControllerUpdate(newOrga: OrganisationEntity,
    id: string): __Observable<{}> {
    return this.organisationControllerUpdateResponse(newOrga, id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param id id
   * @return OK
   */
  organisationControllerDeleteResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}`,
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
   * @param id id
   * @return OK
   */
  organisationControllerDelete(id: string): __Observable<{}> {
    return this.organisationControllerDeleteResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readActivities
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  organisationControllerReadActivitiesResponse(id: string,
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
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/activities`,
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
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  organisationControllerReadActivities(id: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.organisationControllerReadActivitiesResponse(id, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteActivity
   * @param id id
   * @param activityId activityId
   * @return OK
   */
  organisationControllerDeleteActivityResponse(id: string,
    activityId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/activities/${encodeURIComponent(String(activityId))}`,
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
   * @param id id
   * @param activityId activityId
   * @return OK
   */
  organisationControllerDeleteActivity(id: string,
    activityId: string): __Observable<{}> {
    return this.organisationControllerDeleteActivityResponse(id, activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readAddress
   * @param id id
   * @return OK
   */
  organisationControllerReadAddressResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/address`,
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
   * @param id id
   * @return OK
   */
  organisationControllerReadAddress(id: string): __Observable<{}> {
    return this.organisationControllerReadAddressResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * updateAddress
   * @param id id
   * @param addressId addressId
   * @return OK
   */
  organisationControllerUpdateAddressResponse(id: string,
    addressId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = addressId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/address`,
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
   * @param id id
   * @param addressId addressId
   * @return OK
   */
  organisationControllerUpdateAddress(id: string,
    addressId: StringPrimitive): __Observable<{}> {
    return this.organisationControllerUpdateAddressResponse(id, addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * grantApproval
   * @param id id
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerGrantApprovalResponse(id: string,
    isApproved: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isApproved;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/approve`,
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
   * @param id id
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerGrantApproval(id: string,
    isApproved: BooleanPrimitive): __Observable<{}> {
    return this.organisationControllerGrantApprovalResponse(id, isApproved).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readAvatar
   * @param id id
   * @return OK
   */
  organisationControllerReadAvatarResponse(id: string): __Observable<__StrictHttpResponse<ImageEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/avatar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImageEntity>;
      })
    );
  }
  /**
   * readAvatar
   * @param id id
   * @return OK
   */
  organisationControllerReadAvatar(id: string): __Observable<ImageEntity> {
    return this.organisationControllerReadAvatarResponse(id).pipe(
      __map(_r => _r.body as ImageEntity)
    );
  }

  /**
   * addAvatar
   * @param id id
   * @param avatar avatar
   * @return OK
   */
  organisationControllerAddAvatarResponse(id: string,
    avatar: ImageEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = avatar;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/avatar`,
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
   * addAvatar
   * @param id id
   * @param avatar avatar
   * @return OK
   */
  organisationControllerAddAvatar(id: string,
    avatar: ImageEntity): __Observable<{}> {
    return this.organisationControllerAddAvatarResponse(id, avatar).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readImages
   * @param id id
   * @return OK
   */
  organisationControllerReadImagesResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/images`,
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
   * @param id id
   * @return OK
   */
  organisationControllerReadImages(id: string): __Observable<{}> {
    return this.organisationControllerReadImagesResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addImage
   * @param id id
   * @param images images
   * @return OK
   */
  organisationControllerAddImageResponse(id: string,
    images: Array<ImageEntity>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = images;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/images`,
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
   * @param id id
   * @param images images
   * @return OK
   */
  organisationControllerAddImage(id: string,
    images: Array<ImageEntity>): __Observable<{}> {
    return this.organisationControllerAddImageResponse(id, images).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteImages
   * @param id id
   * @param imageIds imageIds
   * @return OK
   */
  organisationControllerDeleteImagesResponse(id: string,
    imageIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (imageIds || []).forEach(val => {if (val != null) __params = __params.append('imageIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/images`,
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
   * @param id id
   * @param imageIds imageIds
   * @return OK
   */
  organisationControllerDeleteImages(id: string,
    imageIds: Array<string>): __Observable<{}> {
    return this.organisationControllerDeleteImagesResponse(id, imageIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * increaseLike
   * @param id id
   * @param subscriptionId subscriptionId
   * @return OK
   */
  organisationControllerIncreaseLikeResponse(id: string,
    subscriptionId?: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = subscriptionId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/like`,
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
   * @param id id
   * @param subscriptionId subscriptionId
   * @return OK
   */
  organisationControllerIncreaseLike(id: string,
    subscriptionId?: StringPrimitive): __Observable<{}> {
    return this.organisationControllerIncreaseLikeResponse(id, subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param id id
   * @return OK
   */
  organisationControllerReadTranslationsResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/translations`,
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
   * @param id id
   * @return OK
   */
  organisationControllerReadTranslations(id: string): __Observable<{}> {
    return this.organisationControllerReadTranslationsResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readUsers
   * @param id id
   * @return OK
   */
  organisationControllerReadUsersResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/users`,
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
   * @param id id
   * @return OK
   */
  organisationControllerReadUsers(id: string): __Observable<{}> {
    return this.organisationControllerReadUsersResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteUser
   * @param id id
   * @param userId userId
   * @return OK
   */
  organisationControllerDeleteUserResponse(id: string,
    userId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/users/${encodeURIComponent(String(userId))}`,
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
   * @param id id
   * @param userId userId
   * @return OK
   */
  organisationControllerDeleteUser(id: string,
    userId: string): __Observable<{}> {
    return this.organisationControllerDeleteUserResponse(id, userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * grantAdminRight
   * @param id id
   * @param userId userId
   * @param isAdmin isAdmin
   * @return OK
   */
  organisationControllerGrantAdminRightResponse(id: string,
    userId: string,
    isAdmin: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = isAdmin;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/users/${encodeURIComponent(String(userId))}/admin`,
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
   * @param id id
   * @param userId userId
   * @param isAdmin isAdmin
   * @return OK
   */
  organisationControllerGrantAdminRight(id: string,
    userId: string,
    isAdmin: BooleanPrimitive): __Observable<{}> {
    return this.organisationControllerGrantAdminRightResponse(id, userId, isAdmin).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * approveOrRejectUser
   * @param id id
   * @param userId userId
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerApproveOrRejectUserResponse(id: string,
    userId: string,
    isApproved: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = isApproved;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/users/${encodeURIComponent(String(userId))}/approve`,
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
   * @param id id
   * @param userId userId
   * @param isApproved isApproved
   * @return OK
   */
  organisationControllerApproveOrRejectUser(id: string,
    userId: string,
    isApproved: BooleanPrimitive): __Observable<{}> {
    return this.organisationControllerApproveOrRejectUserResponse(id, userId, isApproved).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readVideos
   * @param id id
   * @return OK
   */
  organisationControllerReadVideosResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/videos`,
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
   * @param id id
   * @return OK
   */
  organisationControllerReadVideos(id: string): __Observable<{}> {
    return this.organisationControllerReadVideosResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addVideos
   * @param id id
   * @param videos videos
   * @return OK
   */
  organisationControllerAddVideosResponse(id: string,
    videos: Array<VideoEntity>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = videos;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/videos`,
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
   * @param id id
   * @param videos videos
   * @return OK
   */
  organisationControllerAddVideos(id: string,
    videos: Array<VideoEntity>): __Observable<{}> {
    return this.organisationControllerAddVideosResponse(id, videos).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteVideos
   * @param id id
   * @param videoIds videoIds
   * @return OK
   */
  organisationControllerDeleteVideosResponse(id: string,
    videoIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (videoIds || []).forEach(val => {if (val != null) __params = __params.append('videoIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/videos`,
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
   * @param id id
   * @param videoIds videoIds
   * @return OK
   */
  organisationControllerDeleteVideos(id: string,
    videoIds: Array<string>): __Observable<{}> {
    return this.organisationControllerDeleteVideosResponse(id, videoIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * calculateVisitors
   * @param id id
   * @return OK
   */
  organisationControllerCalculateVisitorsResponse(id: string): __Observable<__StrictHttpResponse<Array<VisitableEntityObject>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/organisations/${encodeURIComponent(String(id))}/visitors`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VisitableEntityObject>>;
      })
    );
  }
  /**
   * calculateVisitors
   * @param id id
   * @return OK
   */
  organisationControllerCalculateVisitors(id: string): __Observable<Array<VisitableEntityObject>> {
    return this.organisationControllerCalculateVisitorsResponse(id).pipe(
      __map(_r => _r.body as Array<VisitableEntityObject>)
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
