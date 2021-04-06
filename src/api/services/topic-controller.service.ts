/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TopicEntity } from '../models/topic-entity';
import { ResourceTopicEntity } from '../models/resource-topic-entity';

/**
 * Topic Controller
 */
@Injectable({
  providedIn: 'root',
})
class TopicControllerService extends __BaseService {
  static readonly topicControllerReadAllPath = '/topics';
  static readonly topicControllerCreatePath = '/topics';
  static readonly topicControllerReadOnePath = '/topics/{topicId}';
  static readonly topicControllerUpdatePath = '/topics/{topicId}';
  static readonly topicControllerDeletePath = '/topics/{topicId}';
  static readonly topicControllerReadPagesPath = '/topics/{topicId}/pages';
  static readonly topicControllerReadTranslationsPath = '/topics/{topicId}/translations';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `TopicControllerService.TopicControllerReadAllParams` containing the following parameters:
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
  topicControllerReadAllResponse(params: TopicControllerService.TopicControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
      this.rootUrl + `/topics`,
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
   * @param params The `TopicControllerService.TopicControllerReadAllParams` containing the following parameters:
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
  topicControllerReadAll(params: TopicControllerService.TopicControllerReadAllParams): __Observable<{}> {
    return this.topicControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newTopic newTopic
   * @return OK
   */
  topicControllerCreateResponse(newTopic: TopicEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newTopic;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/topics`,
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
   * @param newTopic newTopic
   * @return OK
   */
  topicControllerCreate(newTopic: TopicEntity): __Observable<{}> {
    return this.topicControllerCreateResponse(newTopic).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param topicId topicId
   * @return OK
   */
  topicControllerReadOneResponse(topicId: string): __Observable<__StrictHttpResponse<ResourceTopicEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/topics/${encodeURIComponent(String(topicId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceTopicEntity>;
      })
    );
  }
  /**
   * readOne
   * @param topicId topicId
   * @return OK
   */
  topicControllerReadOne(topicId: string): __Observable<ResourceTopicEntity> {
    return this.topicControllerReadOneResponse(topicId).pipe(
      __map(_r => _r.body as ResourceTopicEntity)
    );
  }

  /**
   * update
   * @param newTopic newTopic
   * @param topicId topicId
   * @return OK
   */
  topicControllerUpdateResponse(newTopic: TopicEntity,
    topicId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newTopic;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/topics/${encodeURIComponent(String(topicId))}`,
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
   * @param newTopic newTopic
   * @param topicId topicId
   * @return OK
   */
  topicControllerUpdate(newTopic: TopicEntity,
    topicId: string): __Observable<{}> {
    return this.topicControllerUpdateResponse(newTopic, topicId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param topicId topicId
   * @return OK
   */
  topicControllerDeleteResponse(topicId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/topics/${encodeURIComponent(String(topicId))}`,
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
   * @param topicId topicId
   * @return OK
   */
  topicControllerDelete(topicId: string): __Observable<{}> {
    return this.topicControllerDeleteResponse(topicId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readPages
   * @param topicId topicId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  topicControllerReadPagesResponse(topicId: string,
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
      this.rootUrl + `/topics/${encodeURIComponent(String(topicId))}/pages`,
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
   * readPages
   * @param topicId topicId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  topicControllerReadPages(topicId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.topicControllerReadPagesResponse(topicId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param topicId topicId
   * @return OK
   */
  topicControllerReadTranslationsResponse(topicId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/topics/${encodeURIComponent(String(topicId))}/translations`,
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
   * @param topicId topicId
   * @return OK
   */
  topicControllerReadTranslations(topicId: string): __Observable<{}> {
    return this.topicControllerReadTranslationsResponse(topicId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module TopicControllerService {

  /**
   * Parameters for topicControllerReadAll
   */
  export interface TopicControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { TopicControllerService }
