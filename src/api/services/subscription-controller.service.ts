/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { SubscriptionEntity } from '../models/subscription-entity';
import { AnalyticsEntry } from '../models/analytics-entry';
import { ResourceSubscriptionEntity } from '../models/resource-subscription-entity';
import { StringPrimitive } from '../models/string-primitive';

/**
 * Subscription Controller
 */
@Injectable({
  providedIn: 'root',
})
class SubscriptionControllerService extends __BaseService {
  static readonly subscriptionControllerReadAllPath = '/subscriptions';
  static readonly subscriptionControllerCreatePath = '/subscriptions';
  static readonly subscriptionControllerCalculateSubscriptionsPath = '/subscriptions/analytics';
  static readonly subscriptionControllerReadOnePath = '/subscriptions/{subscriptionId}';
  static readonly subscriptionControllerUpdatePath = '/subscriptions/{subscriptionId}';
  static readonly subscriptionControllerDeletePath = '/subscriptions/{subscriptionId}';
  static readonly subscriptionControllerReadActivitySubscriptionsPath = '/subscriptions/{subscriptionId}/activities';
  static readonly subscriptionControllerAddActivitySubscriptionPath = '/subscriptions/{subscriptionId}/activities';
  static readonly subscriptionControllerDeleteActivitySubscriptionsPath = '/subscriptions/{subscriptionId}/activities';
  static readonly subscriptionControllerReadBloggerSubscriptionsPath = '/subscriptions/{subscriptionId}/bloggers';
  static readonly subscriptionControllerAddBloggerSubscriptionPath = '/subscriptions/{subscriptionId}/bloggers';
  static readonly subscriptionControllerDeleteBloggerSubscriptionsPath = '/subscriptions/{subscriptionId}/bloggers';
  static readonly subscriptionControllerReadOrganisationSubscriptionsPath = '/subscriptions/{subscriptionId}/organisations';
  static readonly subscriptionControllerAddOrganisationSubscriptionPath = '/subscriptions/{subscriptionId}/organisations';
  static readonly subscriptionControllerDeleteOrganisationSubscriptionsPath = '/subscriptions/{subscriptionId}/organisations';
  static readonly subscriptionControllerReadTopicSubscriptionsPath = '/subscriptions/{subscriptionId}/topics';
  static readonly subscriptionControllerAddTopicSubscriptionPath = '/subscriptions/{subscriptionId}/topics';
  static readonly subscriptionControllerDeleteTopicSubscriptionsPath = '/subscriptions/{subscriptionId}/topics';
  static readonly subscriptionControllerReadSubscribedTypesPath = '/subscriptions/{subscriptionId}/types';
  static readonly subscriptionControllerAddSubscriptionTypePath = '/subscriptions/{subscriptionId}/types';
  static readonly subscriptionControllerDeleteSubscriptionTypesPath = '/subscriptions/{subscriptionId}/types';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `SubscriptionControllerService.SubscriptionControllerReadAllParams` containing the following parameters:
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
  subscriptionControllerReadAllResponse(params: SubscriptionControllerService.SubscriptionControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
      this.rootUrl + `/subscriptions`,
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
   * @param params The `SubscriptionControllerService.SubscriptionControllerReadAllParams` containing the following parameters:
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
  subscriptionControllerReadAll(params: SubscriptionControllerService.SubscriptionControllerReadAllParams): __Observable<{}> {
    return this.subscriptionControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newSubscription newSubscription
   * @return OK
   */
  subscriptionControllerCreateResponse(newSubscription: SubscriptionEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newSubscription;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/subscriptions`,
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
   * @param newSubscription newSubscription
   * @return OK
   */
  subscriptionControllerCreate(newSubscription: SubscriptionEntity): __Observable<{}> {
    return this.subscriptionControllerCreateResponse(newSubscription).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * calculateSubscriptions
   * @return OK
   */
  subscriptionControllerCalculateSubscriptionsResponse(): __Observable<__StrictHttpResponse<Array<AnalyticsEntry>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/subscriptions/analytics`,
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
   * calculateSubscriptions
   * @return OK
   */
  subscriptionControllerCalculateSubscriptions(): __Observable<Array<AnalyticsEntry>> {
    return this.subscriptionControllerCalculateSubscriptionsResponse().pipe(
      __map(_r => _r.body as Array<AnalyticsEntry>)
    );
  }

  /**
   * readOne
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadOneResponse(subscriptionId: string): __Observable<__StrictHttpResponse<ResourceSubscriptionEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceSubscriptionEntity>;
      })
    );
  }
  /**
   * readOne
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadOne(subscriptionId: string): __Observable<ResourceSubscriptionEntity> {
    return this.subscriptionControllerReadOneResponse(subscriptionId).pipe(
      __map(_r => _r.body as ResourceSubscriptionEntity)
    );
  }

  /**
   * update
   * @param newSubscription newSubscription
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerUpdateResponse(newSubscription: SubscriptionEntity,
    subscriptionId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newSubscription;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}`,
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
   * @param newSubscription newSubscription
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerUpdate(newSubscription: SubscriptionEntity,
    subscriptionId: string): __Observable<{}> {
    return this.subscriptionControllerUpdateResponse(newSubscription, subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerDeleteResponse(subscriptionId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}`,
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
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerDelete(subscriptionId: string): __Observable<{}> {
    return this.subscriptionControllerDeleteResponse(subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readActivitySubscriptions
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadActivitySubscriptionsResponse(subscriptionId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/activities`,
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
   * readActivitySubscriptions
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadActivitySubscriptions(subscriptionId: string): __Observable<{}> {
    return this.subscriptionControllerReadActivitySubscriptionsResponse(subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addActivitySubscription
   * @param subscriptionId subscriptionId
   * @param activityId activityId
   * @return OK
   */
  subscriptionControllerAddActivitySubscriptionResponse(subscriptionId: string,
    activityId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = activityId;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/activities`,
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
   * addActivitySubscription
   * @param subscriptionId subscriptionId
   * @param activityId activityId
   * @return OK
   */
  subscriptionControllerAddActivitySubscription(subscriptionId: string,
    activityId: StringPrimitive): __Observable<{}> {
    return this.subscriptionControllerAddActivitySubscriptionResponse(subscriptionId, activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteActivitySubscriptions
   * @param subscriptionId subscriptionId
   * @param activityIds activityIds
   * @return OK
   */
  subscriptionControllerDeleteActivitySubscriptionsResponse(subscriptionId: string,
    activityIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (activityIds || []).forEach(val => {if (val != null) __params = __params.append('activityIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/activities`,
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
   * deleteActivitySubscriptions
   * @param subscriptionId subscriptionId
   * @param activityIds activityIds
   * @return OK
   */
  subscriptionControllerDeleteActivitySubscriptions(subscriptionId: string,
    activityIds: Array<string>): __Observable<{}> {
    return this.subscriptionControllerDeleteActivitySubscriptionsResponse(subscriptionId, activityIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readBloggerSubscriptions
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadBloggerSubscriptionsResponse(subscriptionId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/bloggers`,
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
   * readBloggerSubscriptions
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadBloggerSubscriptions(subscriptionId: string): __Observable<{}> {
    return this.subscriptionControllerReadBloggerSubscriptionsResponse(subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addBloggerSubscription
   * @param subscriptionId subscriptionId
   * @param bloggerId bloggerId
   * @return OK
   */
  subscriptionControllerAddBloggerSubscriptionResponse(subscriptionId: string,
    bloggerId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = bloggerId;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/bloggers`,
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
   * addBloggerSubscription
   * @param subscriptionId subscriptionId
   * @param bloggerId bloggerId
   * @return OK
   */
  subscriptionControllerAddBloggerSubscription(subscriptionId: string,
    bloggerId: StringPrimitive): __Observable<{}> {
    return this.subscriptionControllerAddBloggerSubscriptionResponse(subscriptionId, bloggerId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteBloggerSubscriptions
   * @param subscriptionId subscriptionId
   * @param bloggerIds bloggerIds
   * @return OK
   */
  subscriptionControllerDeleteBloggerSubscriptionsResponse(subscriptionId: string,
    bloggerIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (bloggerIds || []).forEach(val => {if (val != null) __params = __params.append('bloggerIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/bloggers`,
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
   * deleteBloggerSubscriptions
   * @param subscriptionId subscriptionId
   * @param bloggerIds bloggerIds
   * @return OK
   */
  subscriptionControllerDeleteBloggerSubscriptions(subscriptionId: string,
    bloggerIds: Array<string>): __Observable<{}> {
    return this.subscriptionControllerDeleteBloggerSubscriptionsResponse(subscriptionId, bloggerIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOrganisationSubscriptions
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadOrganisationSubscriptionsResponse(subscriptionId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/organisations`,
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
   * readOrganisationSubscriptions
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadOrganisationSubscriptions(subscriptionId: string): __Observable<{}> {
    return this.subscriptionControllerReadOrganisationSubscriptionsResponse(subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addOrganisationSubscription
   * @param subscriptionId subscriptionId
   * @param organisationId organisationId
   * @return OK
   */
  subscriptionControllerAddOrganisationSubscriptionResponse(subscriptionId: string,
    organisationId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = organisationId;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/organisations`,
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
   * addOrganisationSubscription
   * @param subscriptionId subscriptionId
   * @param organisationId organisationId
   * @return OK
   */
  subscriptionControllerAddOrganisationSubscription(subscriptionId: string,
    organisationId: StringPrimitive): __Observable<{}> {
    return this.subscriptionControllerAddOrganisationSubscriptionResponse(subscriptionId, organisationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteOrganisationSubscriptions
   * @param subscriptionId subscriptionId
   * @param organisationIds organisationIds
   * @return OK
   */
  subscriptionControllerDeleteOrganisationSubscriptionsResponse(subscriptionId: string,
    organisationIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (organisationIds || []).forEach(val => {if (val != null) __params = __params.append('organisationIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/organisations`,
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
   * deleteOrganisationSubscriptions
   * @param subscriptionId subscriptionId
   * @param organisationIds organisationIds
   * @return OK
   */
  subscriptionControllerDeleteOrganisationSubscriptions(subscriptionId: string,
    organisationIds: Array<string>): __Observable<{}> {
    return this.subscriptionControllerDeleteOrganisationSubscriptionsResponse(subscriptionId, organisationIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTopicSubscriptions
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadTopicSubscriptionsResponse(subscriptionId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/topics`,
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
   * readTopicSubscriptions
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadTopicSubscriptions(subscriptionId: string): __Observable<{}> {
    return this.subscriptionControllerReadTopicSubscriptionsResponse(subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addTopicSubscription
   * @param subscriptionId subscriptionId
   * @param topicId topicId
   * @return OK
   */
  subscriptionControllerAddTopicSubscriptionResponse(subscriptionId: string,
    topicId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = topicId;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/topics`,
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
   * addTopicSubscription
   * @param subscriptionId subscriptionId
   * @param topicId topicId
   * @return OK
   */
  subscriptionControllerAddTopicSubscription(subscriptionId: string,
    topicId: StringPrimitive): __Observable<{}> {
    return this.subscriptionControllerAddTopicSubscriptionResponse(subscriptionId, topicId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteTopicSubscriptions
   * @param subscriptionId subscriptionId
   * @param topicIds topicIds
   * @return OK
   */
  subscriptionControllerDeleteTopicSubscriptionsResponse(subscriptionId: string,
    topicIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (topicIds || []).forEach(val => {if (val != null) __params = __params.append('topicIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/topics`,
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
   * deleteTopicSubscriptions
   * @param subscriptionId subscriptionId
   * @param topicIds topicIds
   * @return OK
   */
  subscriptionControllerDeleteTopicSubscriptions(subscriptionId: string,
    topicIds: Array<string>): __Observable<{}> {
    return this.subscriptionControllerDeleteTopicSubscriptionsResponse(subscriptionId, topicIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readSubscribedTypes
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadSubscribedTypesResponse(subscriptionId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/types`,
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
   * readSubscribedTypes
   * @param subscriptionId subscriptionId
   * @return OK
   */
  subscriptionControllerReadSubscribedTypes(subscriptionId: string): __Observable<{}> {
    return this.subscriptionControllerReadSubscribedTypesResponse(subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addSubscriptionType
   * @param subscriptionId subscriptionId
   * @param subscriptionTypeIds subscriptionTypeIds
   * @return OK
   */
  subscriptionControllerAddSubscriptionTypeResponse(subscriptionId: string,
    subscriptionTypeIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = subscriptionTypeIds;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/types`,
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
   * addSubscriptionType
   * @param subscriptionId subscriptionId
   * @param subscriptionTypeIds subscriptionTypeIds
   * @return OK
   */
  subscriptionControllerAddSubscriptionType(subscriptionId: string,
    subscriptionTypeIds: Array<string>): __Observable<{}> {
    return this.subscriptionControllerAddSubscriptionTypeResponse(subscriptionId, subscriptionTypeIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteSubscriptionTypes
   * @param subscriptionId subscriptionId
   * @param subscriptionTypeIds subscriptionTypeIds
   * @return OK
   */
  subscriptionControllerDeleteSubscriptionTypesResponse(subscriptionId: string,
    subscriptionTypeIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (subscriptionTypeIds || []).forEach(val => {if (val != null) __params = __params.append('subscriptionTypeIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/subscriptions/${encodeURIComponent(String(subscriptionId))}/types`,
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
   * deleteSubscriptionTypes
   * @param subscriptionId subscriptionId
   * @param subscriptionTypeIds subscriptionTypeIds
   * @return OK
   */
  subscriptionControllerDeleteSubscriptionTypes(subscriptionId: string,
    subscriptionTypeIds: Array<string>): __Observable<{}> {
    return this.subscriptionControllerDeleteSubscriptionTypesResponse(subscriptionId, subscriptionTypeIds).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module SubscriptionControllerService {

  /**
   * Parameters for subscriptionControllerReadAll
   */
  export interface SubscriptionControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { SubscriptionControllerService }
