/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ActivityEntity } from '../models/activity-entity';
import { AnalyticsEntry } from '../models/analytics-entry';
import { VisitableEntityObject } from '../models/visitable-entity-object';
import { ResourceActivityEntity } from '../models/resource-activity-entity';
import { StringPrimitive } from '../models/string-primitive';
import { ImageEntity } from '../models/image-entity';
import { ResourcesObject } from '../models/resources-object';
import { ScheduleEntity } from '../models/schedule-entity';

/**
 * Activity Controller
 */
@Injectable({
  providedIn: 'root',
})
class ActivityControllerService extends __BaseService {
  static readonly activityControllerReadAllPath = '/activities';
  static readonly activityControllerCreatePath = '/activities';
  static readonly activityControllerCalculateActivitiesPerCategoryPath = '/activities/analytics/categories';
  static readonly activityControllerCalculateActivitiesPerSuburbsPath = '/activities/analytics/suburbs';
  static readonly activityControllerCalculateActivitiesPerTargetGroupPath = '/activities/analytics/targetgroups';
  static readonly activityControllerCalculateOverviewVisitsPath = '/activities/visitors';
  static readonly activityControllerReadOnePath = '/activities/{id}';
  static readonly activityControllerUpdatePath = '/activities/{id}';
  static readonly activityControllerDeletePath = '/activities/{id}';
  static readonly activityControllerReadAddressPath = '/activities/{id}/address';
  static readonly activityControllerUpdateAddressPath = '/activities/{id}/address';
  static readonly activityControllerReadCategoryPath = '/activities/{id}/category';
  static readonly activityControllerUpdateCategoryPath = '/activities/{id}/category';
  static readonly activityControllerGenerateAllIcalPath = '/activities/{id}/iCal';
  static readonly activityControllerReadImagesPath = '/activities/{id}/images';
  static readonly activityControllerAddImagePath = '/activities/{id}/images';
  static readonly activityControllerDeleteImagesPath = '/activities/{id}/images';
  static readonly activityControllerIncreaseLikePath = '/activities/{id}/like';
  static readonly activityControllerReadOrganisationPath = '/activities/{id}/organisation';
  static readonly activityControllerUpdateOrganisationPath = '/activities/{id}/organisation';
  static readonly activityControllerReadSchedulesPath = '/activities/{id}/schedules';
  static readonly activityControllerAddSchedulesPath = '/activities/{id}/schedules';
  static readonly activityControllerDeleteSchedulesPath = '/activities/{id}/schedules';
  static readonly activityControllerReadTargetGroupsPath = '/activities/{id}/targetgroups';
  static readonly activityControllerAddTargetGroupsPath = '/activities/{id}/targetgroups';
  static readonly activityControllerDeleteTargetGroupsPath = '/activities/{id}/targetgroups';
  static readonly activityControllerReadTitleImagePath = '/activities/{id}/titleimage';
  static readonly activityControllerAddTitleImagePath = '/activities/{id}/titleimage';
  static readonly activityControllerReadTranslationsPath = '/activities/{id}/translations';
  static readonly activityControllerCalculateVisitorsPath = '/activities/{id}/visitors';
  static readonly activityControllerGenerateIcalPath = '/activities/{id}/{scheduleId}/iCal';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `ActivityControllerService.ActivityControllerReadAllParams` containing the following parameters:
   *
   * - `categories`:
   *
   * - `suburbs`:
   *
   * - `targetgroups`:
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
   * - `current`:
   *
   * - `startDate`:
   *
   * - `endDate`:
   *
   * @return OK
   */
  activityControllerReadAllResponse(params: ActivityControllerService.ActivityControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.categories || []).forEach(val => {if (val != null) __params = __params.append('categories', val.toString())});
    (params.suburbs || []).forEach(val => {if (val != null) __params = __params.append('suburbs', val.toString())});
    (params.targetgroups || []).forEach(val => {if (val != null) __params = __params.append('targetgroups', val.toString())});
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
    if (params.embeddings != null) __params = __params.set('embeddings', params.embeddings.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.filter != null) __params = __params.set('filter', params.filter.toString());
    if (params.current != null) __params = __params.set('current', params.current.toString());
    if (params.startDate != null) __params = __params.set('startDate', params.startDate.toString());
    if (params.endDate != null) __params = __params.set('endDate', params.endDate.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities`,
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
   * @param params The `ActivityControllerService.ActivityControllerReadAllParams` containing the following parameters:
   *
   * - `categories`:
   *
   * - `suburbs`:
   *
   * - `targetgroups`:
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
   * - `current`:
   *
   * - `startDate`:
   *
   * - `endDate`:
   *
   * @return OK
   */
  activityControllerReadAll(params: ActivityControllerService.ActivityControllerReadAllParams): __Observable<{}> {
    return this.activityControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newActivity newActivity
   * @return OK
   */
  activityControllerCreateResponse(newActivity: ActivityEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newActivity;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities`,
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
   * @param newActivity newActivity
   * @return OK
   */
  activityControllerCreate(newActivity: ActivityEntity): __Observable<{}> {
    return this.activityControllerCreateResponse(newActivity).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * calculateActivitiesPerCategory
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerCategoryResponse(value?: boolean): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (value != null) __params = __params.set('value', value.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/analytics/categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AnalyticsEntry>>;
      })
    );
  }
  /**
   * calculateActivitiesPerCategory
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerCategory(value?: boolean): __Observable<Array<AnalyticsEntry>> {
    return this.activityControllerCalculateActivitiesPerCategoryResponse(value).pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }

  /**
   * calculateActivitiesPerSuburbs
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerSuburbsResponse(value?: boolean): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (value != null) __params = __params.set('value', value.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/analytics/suburbs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AnalyticsEntry>>;
      })
    );
  }
  /**
   * calculateActivitiesPerSuburbs
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerSuburbs(value?: boolean): __Observable<Array<AnalyticsEntry>> {
    return this.activityControllerCalculateActivitiesPerSuburbsResponse(value).pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }

  /**
   * calculateActivitiesPerTargetGroup
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerTargetGroupResponse(value?: boolean): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (value != null) __params = __params.set('value', value.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/analytics/targetgroups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AnalyticsEntry>>;
      })
    );
  }
  /**
   * calculateActivitiesPerTargetGroup
   * @param value undefined
   * @return OK
   */
  activityControllerCalculateActivitiesPerTargetGroup(value?: boolean): __Observable<Array<AnalyticsEntry>> {
    return this.activityControllerCalculateActivitiesPerTargetGroupResponse(value).pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }

  /**
   * calculateOverviewVisits
   * @return OK
   */
  activityControllerCalculateOverviewVisitsResponse(): __Observable<__StrictHttpResponse<Array<VisitableEntityObject>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/visitors`,
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
   * calculateOverviewVisits
   * @return OK
   */
  activityControllerCalculateOverviewVisits(): __Observable<Array<VisitableEntityObject>> {
    return this.activityControllerCalculateOverviewVisitsResponse().pipe(
      __map(_r => _r.body as Array<VisitableEntityObject>)
    );
  }

  /**
   * readOne
   * @param id id
   * @return OK
   */
  activityControllerReadOneResponse(id: string): __Observable<__StrictHttpResponse<ResourceActivityEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceActivityEntity>;
      })
    );
  }
  /**
   * readOne
   * @param id id
   * @return OK
   */
  activityControllerReadOne(id: string): __Observable<ResourceActivityEntity> {
    return this.activityControllerReadOneResponse(id).pipe(
      __map(_r => _r.body as ResourceActivityEntity)
    );
  }

  /**
   * update
   * @param newActivity newActivity
   * @param id id
   * @return OK
   */
  activityControllerUpdateResponse(newActivity: ActivityEntity,
    id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newActivity;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}`,
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
   * @param newActivity newActivity
   * @param id id
   * @return OK
   */
  activityControllerUpdate(newActivity: ActivityEntity,
    id: string): __Observable<{}> {
    return this.activityControllerUpdateResponse(newActivity, id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param id id
   * @return OK
   */
  activityControllerDeleteResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}`,
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
  activityControllerDelete(id: string): __Observable<{}> {
    return this.activityControllerDeleteResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readAddress
   * @param id id
   * @return OK
   */
  activityControllerReadAddressResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/address`,
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
  activityControllerReadAddress(id: string): __Observable<{}> {
    return this.activityControllerReadAddressResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * updateAddress
   * @param id id
   * @param addressId addressId
   * @return OK
   */
  activityControllerUpdateAddressResponse(id: string,
    addressId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = addressId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/address`,
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
  activityControllerUpdateAddress(id: string,
    addressId: StringPrimitive): __Observable<{}> {
    return this.activityControllerUpdateAddressResponse(id, addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readCategory
   * @param id id
   * @return OK
   */
  activityControllerReadCategoryResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/category`,
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
   * readCategory
   * @param id id
   * @return OK
   */
  activityControllerReadCategory(id: string): __Observable<{}> {
    return this.activityControllerReadCategoryResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * updateCategory
   * @param id id
   * @param categoryId categoryId
   * @return OK
   */
  activityControllerUpdateCategoryResponse(id: string,
    categoryId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = categoryId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/category`,
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
   * updateCategory
   * @param id id
   * @param categoryId categoryId
   * @return OK
   */
  activityControllerUpdateCategory(id: string,
    categoryId: StringPrimitive): __Observable<{}> {
    return this.activityControllerUpdateCategoryResponse(id, categoryId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * generateAllIcal
   * @param id id
   * @return OK
   */
  activityControllerGenerateAllIcalResponse(id: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/iCal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * generateAllIcal
   * @param id id
   * @return OK
   */
  activityControllerGenerateAllIcal(id: string): __Observable<string> {
    return this.activityControllerGenerateAllIcalResponse(id).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * readImages
   * @param id id
   * @return OK
   */
  activityControllerReadImagesResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/images`,
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
  activityControllerReadImages(id: string): __Observable<{}> {
    return this.activityControllerReadImagesResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addImage
   * @param id id
   * @param images images
   * @return OK
   */
  activityControllerAddImageResponse(id: string,
    images: Array<ImageEntity>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = images;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/images`,
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
  activityControllerAddImage(id: string,
    images: Array<ImageEntity>): __Observable<{}> {
    return this.activityControllerAddImageResponse(id, images).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteImages
   * @param id id
   * @param imageIds imageIds
   * @return OK
   */
  activityControllerDeleteImagesResponse(id: string,
    imageIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (imageIds || []).forEach(val => {if (val != null) __params = __params.append('imageIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/images`,
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
  activityControllerDeleteImages(id: string,
    imageIds: Array<string>): __Observable<{}> {
    return this.activityControllerDeleteImagesResponse(id, imageIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * increaseLike
   * @param id id
   * @param subscriptionId subscriptionId
   * @return OK
   */
  activityControllerIncreaseLikeResponse(id: string,
    subscriptionId?: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = subscriptionId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/like`,
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
  activityControllerIncreaseLike(id: string,
    subscriptionId?: StringPrimitive): __Observable<{}> {
    return this.activityControllerIncreaseLikeResponse(id, subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOrganisation
   * @param id id
   * @return OK
   */
  activityControllerReadOrganisationResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/organisation`,
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
   * readOrganisation
   * @param id id
   * @return OK
   */
  activityControllerReadOrganisation(id: string): __Observable<{}> {
    return this.activityControllerReadOrganisationResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * updateOrganisation
   * @param id id
   * @param organisationId organisationId
   * @return OK
   */
  activityControllerUpdateOrganisationResponse(id: string,
    organisationId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = organisationId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/organisation`,
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
   * updateOrganisation
   * @param id id
   * @param organisationId organisationId
   * @return OK
   */
  activityControllerUpdateOrganisation(id: string,
    organisationId: StringPrimitive): __Observable<{}> {
    return this.activityControllerUpdateOrganisationResponse(id, organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readSchedules
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadSchedulesResponse(id: string,
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
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/schedules`,
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
   * readSchedules
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadSchedules(id: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.activityControllerReadSchedulesResponse(id, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addSchedules
   * @param id id
   * @param schedules schedules
   * @return OK
   */
  activityControllerAddSchedulesResponse(id: string,
    schedules: Array<ScheduleEntity>): __Observable<__StrictHttpResponse<ResourcesObject>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = schedules;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/schedules`,
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
   * addSchedules
   * @param id id
   * @param schedules schedules
   * @return OK
   */
  activityControllerAddSchedules(id: string,
    schedules: Array<ScheduleEntity>): __Observable<ResourcesObject> {
    return this.activityControllerAddSchedulesResponse(id, schedules).pipe(
      __map(_r => _r.body as ResourcesObject)
    );
  }

  /**
   * deleteSchedules
   * @param id id
   * @param scheduleIds scheduleIds
   * @return OK
   */
  activityControllerDeleteSchedulesResponse(id: string,
    scheduleIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (scheduleIds || []).forEach(val => {if (val != null) __params = __params.append('scheduleIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/schedules`,
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
   * deleteSchedules
   * @param id id
   * @param scheduleIds scheduleIds
   * @return OK
   */
  activityControllerDeleteSchedules(id: string,
    scheduleIds: Array<string>): __Observable<{}> {
    return this.activityControllerDeleteSchedulesResponse(id, scheduleIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTargetGroups
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadTargetGroupsResponse(id: string,
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
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/targetgroups`,
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
   * readTargetGroups
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadTargetGroups(id: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.activityControllerReadTargetGroupsResponse(id, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addTargetGroups
   * @param id id
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerAddTargetGroupsResponse(id: string,
    targetGroupIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = targetGroupIds;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/targetgroups`,
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
   * addTargetGroups
   * @param id id
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerAddTargetGroups(id: string,
    targetGroupIds: Array<string>): __Observable<{}> {
    return this.activityControllerAddTargetGroupsResponse(id, targetGroupIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteTargetGroups
   * @param id id
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerDeleteTargetGroupsResponse(id: string,
    targetGroupIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (targetGroupIds || []).forEach(val => {if (val != null) __params = __params.append('targetGroupIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/targetgroups`,
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
   * deleteTargetGroups
   * @param id id
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerDeleteTargetGroups(id: string,
    targetGroupIds: Array<string>): __Observable<{}> {
    return this.activityControllerDeleteTargetGroupsResponse(id, targetGroupIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTitleImage
   * @param id id
   * @return OK
   */
  activityControllerReadTitleImageResponse(id: string): __Observable<__StrictHttpResponse<ImageEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/titleimage`,
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
   * readTitleImage
   * @param id id
   * @return OK
   */
  activityControllerReadTitleImage(id: string): __Observable<ImageEntity> {
    return this.activityControllerReadTitleImageResponse(id).pipe(
      __map(_r => _r.body as ImageEntity)
    );
  }

  /**
   * addTitleImage
   * @param id id
   * @param titleImage titleImage
   * @return OK
   */
  activityControllerAddTitleImageResponse(id: string,
    titleImage: ImageEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = titleImage;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/titleimage`,
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
   * addTitleImage
   * @param id id
   * @param titleImage titleImage
   * @return OK
   */
  activityControllerAddTitleImage(id: string,
    titleImage: ImageEntity): __Observable<{}> {
    return this.activityControllerAddTitleImageResponse(id, titleImage).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param id id
   * @return OK
   */
  activityControllerReadTranslationsResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/translations`,
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
  activityControllerReadTranslations(id: string): __Observable<{}> {
    return this.activityControllerReadTranslationsResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * calculateVisitors
   * @param id id
   * @return OK
   */
  activityControllerCalculateVisitorsResponse(id: string): __Observable<__StrictHttpResponse<Array<VisitableEntityObject>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/visitors`,
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
  activityControllerCalculateVisitors(id: string): __Observable<Array<VisitableEntityObject>> {
    return this.activityControllerCalculateVisitorsResponse(id).pipe(
      __map(_r => _r.body as Array<VisitableEntityObject>)
    );
  }

  /**
   * generateIcal
   * @param id id
   * @param scheduleId scheduleId
   * @return OK
   */
  activityControllerGenerateIcalResponse(id: string,
    scheduleId: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${encodeURIComponent(String(id))}/${encodeURIComponent(String(scheduleId))}/iCal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * generateIcal
   * @param id id
   * @param scheduleId scheduleId
   * @return OK
   */
  activityControllerGenerateIcal(id: string,
    scheduleId: string): __Observable<string> {
    return this.activityControllerGenerateIcalResponse(id, scheduleId).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ActivityControllerService {

  /**
   * Parameters for activityControllerReadAll
   */
  export interface ActivityControllerReadAllParams {
    categories?: Array<string>;
    suburbs?: Array<string>;
    targetgroups?: Array<string>;
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
    current?: boolean;
    startDate?: string;
    endDate?: string;
  }
}

export { ActivityControllerService }
