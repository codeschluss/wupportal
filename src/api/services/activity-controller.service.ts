/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ActivityEntity } from '../models/activity-entity';
import { ResourceActivityEntity } from '../models/resource-activity-entity';
import { StringPrimitive } from '../models/string-primitive';
import { ResourcesObject } from '../models/resources-object';
import { ScheduleEntity } from '../models/schedule-entity';
import { TagEntity } from '../models/tag-entity';

/**
 * Activity Controller
 */
@Injectable({
  providedIn: 'root',
})
class ActivityControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
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
   * @return OK
   */
  activityControllerReadAllResponse(params: ActivityControllerService.ActivityControllerReadAllParams): Observable<StrictHttpResponse<{}>> {
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
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
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
   * @return OK
   */
  activityControllerReadAll(params: ActivityControllerService.ActivityControllerReadAllParams): Observable<{}> {
    return this.activityControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newActivity newActivity
   * @return OK
   */
  activityControllerCreateResponse(newActivity: ActivityEntity): Observable<StrictHttpResponse<{}>> {
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
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newActivity newActivity
   * @return OK
   */
  activityControllerCreate(newActivity: ActivityEntity): Observable<{}> {
    return this.activityControllerCreateResponse(newActivity).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadOneResponse(activityId: string): Observable<StrictHttpResponse<ResourceActivityEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceActivityEntity>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadOne(activityId: string): Observable<ResourceActivityEntity> {
    return this.activityControllerReadOneResponse(activityId).pipe(
      __map(_r => _r.body as ResourceActivityEntity)
    );
  }

  /**
   * @param newActivity newActivity
   * @param activityId activityId
   * @return OK
   */
  activityControllerUpdateResponse(newActivity: ActivityEntity,
    activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newActivity;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${activityId}`,
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
   * @param newActivity newActivity
   * @param activityId activityId
   * @return OK
   */
  activityControllerUpdate(newActivity: ActivityEntity,
    activityId: string): Observable<{}> {
    return this.activityControllerUpdateResponse(newActivity, activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerDeleteResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${activityId}`,
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
   * @return OK
   */
  activityControllerDelete(activityId: string): Observable<{}> {
    return this.activityControllerDeleteResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadAddressResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}/address`,
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
   * @return OK
   */
  activityControllerReadAddress(activityId: string): Observable<{}> {
    return this.activityControllerReadAddressResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param addressId addressId
   * @return OK
   */
  activityControllerUpdateAddressResponse(activityId: string,
    addressId: StringPrimitive): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = addressId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${activityId}/address`,
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
   * @param addressId addressId
   * @return OK
   */
  activityControllerUpdateAddress(activityId: string,
    addressId: StringPrimitive): Observable<{}> {
    return this.activityControllerUpdateAddressResponse(activityId, addressId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadCategoryResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}/category`,
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
   * @return OK
   */
  activityControllerReadCategory(activityId: string): Observable<{}> {
    return this.activityControllerReadCategoryResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param categoryId categoryId
   * @return OK
   */
  activityControllerUpdateCategoryResponse(activityId: string,
    categoryId: StringPrimitive): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = categoryId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${activityId}/category`,
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
   * @param categoryId categoryId
   * @return OK
   */
  activityControllerUpdateCategory(activityId: string,
    categoryId: StringPrimitive): Observable<{}> {
    return this.activityControllerUpdateCategoryResponse(activityId, categoryId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadOrganisationResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}/organisation`,
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
   * @return OK
   */
  activityControllerReadOrganisation(activityId: string): Observable<{}> {
    return this.activityControllerReadOrganisationResponse(activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param organisationId organisationId
   * @return OK
   */
  activityControllerUpdateOrganisationResponse(activityId: string,
    organisationId: StringPrimitive): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = organisationId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/activities/${activityId}/organisation`,
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
  activityControllerUpdateOrganisation(activityId: string,
    organisationId: StringPrimitive): Observable<{}> {
    return this.activityControllerUpdateOrganisationResponse(activityId, organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadSchedulesResponse(activityId: string,
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
      this.rootUrl + `/activities/${activityId}/schedules`,
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
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadSchedules(activityId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): Observable<{}> {
    return this.activityControllerReadSchedulesResponse(activityId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param schedules schedules
   * @return OK
   */
  activityControllerAddSchedulesResponse(activityId: string,
    schedules: Array<ScheduleEntity>): Observable<StrictHttpResponse<ResourcesObject>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = schedules;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${activityId}/schedules`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourcesObject>;
      })
    );
  }
  /**
   * @param activityId activityId
   * @param schedules schedules
   * @return OK
   */
  activityControllerAddSchedules(activityId: string,
    schedules: Array<ScheduleEntity>): Observable<ResourcesObject> {
    return this.activityControllerAddSchedulesResponse(activityId, schedules).pipe(
      __map(_r => _r.body as ResourcesObject)
    );
  }

  /**
   * @param activityId activityId
   * @param scheduleIds scheduleIds
   * @return OK
   */
  activityControllerDeleteSchedulesResponse(activityId: string,
    scheduleIds: Array<string>): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (scheduleIds || []).forEach(val => {if (val != null) __params = __params.append('scheduleIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${activityId}/schedules`,
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
   * @param scheduleIds scheduleIds
   * @return OK
   */
  activityControllerDeleteSchedules(activityId: string,
    scheduleIds: Array<string>): Observable<{}> {
    return this.activityControllerDeleteSchedulesResponse(activityId, scheduleIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadTagsResponse(activityId: string,
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
      this.rootUrl + `/activities/${activityId}/tags`,
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
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadTags(activityId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): Observable<{}> {
    return this.activityControllerReadTagsResponse(activityId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param tags tags
   * @return OK
   */
  activityControllerAddTagsResponse(activityId: string,
    tags: Array<TagEntity>): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = tags;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${activityId}/tags`,
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
   * @param tags tags
   * @return OK
   */
  activityControllerAddTags(activityId: string,
    tags: Array<TagEntity>): Observable<{}> {
    return this.activityControllerAddTagsResponse(activityId, tags).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param tagIds tagIds
   * @return OK
   */
  activityControllerDeleteTagsResponse(activityId: string,
    tagIds: Array<string>): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (tagIds || []).forEach(val => {if (val != null) __params = __params.append('tagIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${activityId}/tags`,
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
   * @param tagIds tagIds
   * @return OK
   */
  activityControllerDeleteTags(activityId: string,
    tagIds: Array<string>): Observable<{}> {
    return this.activityControllerDeleteTagsResponse(activityId, tagIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadTargetGroupsResponse(activityId: string,
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
      this.rootUrl + `/activities/${activityId}/targetgroups`,
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
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  activityControllerReadTargetGroups(activityId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): Observable<{}> {
    return this.activityControllerReadTargetGroupsResponse(activityId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerAddTargetGroupsResponse(activityId: string,
    targetGroupIds: Array<string>): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = targetGroupIds;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/activities/${activityId}/targetgroups`,
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
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerAddTargetGroups(activityId: string,
    targetGroupIds: Array<string>): Observable<{}> {
    return this.activityControllerAddTargetGroupsResponse(activityId, targetGroupIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerDeleteTargetGroupsResponse(activityId: string,
    targetGroupIds: Array<string>): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (targetGroupIds || []).forEach(val => {if (val != null) __params = __params.append('targetGroupIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/activities/${activityId}/targetgroups`,
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
   * @param targetGroupIds targetGroupIds
   * @return OK
   */
  activityControllerDeleteTargetGroups(activityId: string,
    targetGroupIds: Array<string>): Observable<{}> {
    return this.activityControllerDeleteTargetGroupsResponse(activityId, targetGroupIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param activityId activityId
   * @return OK
   */
  activityControllerReadTranslationsResponse(activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/activities/${activityId}/translations`,
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
   * @return OK
   */
  activityControllerReadTranslations(activityId: string): Observable<{}> {
    return this.activityControllerReadTranslationsResponse(activityId).pipe(
      __map(_r => _r.body as {})
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
  }
}

export { ActivityControllerService }
