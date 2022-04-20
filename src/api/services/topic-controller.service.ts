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
  static readonly topicControllerReadOnePath = '/topics/{id}';
  static readonly topicControllerUpdatePath = '/topics/{id}';
  static readonly topicControllerDeletePath = '/topics/{id}';
  static readonly topicControllerReadBlogsPath = '/topics/{id}/blogs';
  static readonly topicControllerReadTranslationsPath = '/topics/{id}/translations';

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
   * @param id id
   * @return OK
   */
  topicControllerReadOneResponse(id: string): __Observable<__StrictHttpResponse<ResourceTopicEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/topics/${encodeURIComponent(String(id))}`,
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
   * @param id id
   * @return OK
   */
  topicControllerReadOne(id: string): __Observable<ResourceTopicEntity> {
    return this.topicControllerReadOneResponse(id).pipe(
      __map(_r => _r.body as ResourceTopicEntity)
    );
  }

  /**
   * update
   * @param newTopic newTopic
   * @param id id
   * @return OK
   */
  topicControllerUpdateResponse(newTopic: TopicEntity,
    id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newTopic;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/topics/${encodeURIComponent(String(id))}`,
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
   * @param id id
   * @return OK
   */
  topicControllerUpdate(newTopic: TopicEntity,
    id: string): __Observable<{}> {
    return this.topicControllerUpdateResponse(newTopic, id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param id id
   * @return OK
   */
  topicControllerDeleteResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/topics/${encodeURIComponent(String(id))}`,
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
  topicControllerDelete(id: string): __Observable<{}> {
    return this.topicControllerDeleteResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readBlogs
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  topicControllerReadBlogsResponse(id: string,
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
      this.rootUrl + `/topics/${encodeURIComponent(String(id))}/blogs`,
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
   * readBlogs
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  topicControllerReadBlogs(id: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.topicControllerReadBlogsResponse(id, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param id id
   * @return OK
   */
  topicControllerReadTranslationsResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/topics/${encodeURIComponent(String(id))}/translations`,
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
  topicControllerReadTranslations(id: string): __Observable<{}> {
    return this.topicControllerReadTranslationsResponse(id).pipe(
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
