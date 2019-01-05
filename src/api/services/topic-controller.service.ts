/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TopicEntity } from '../models/topic-entity';
import { ResourceTopicEntity } from '../models/resource-topic-entity';

/**
 * Topic Controller
 */
@Injectable({
  providedIn: 'root',
})
class TopicControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
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
  topicControllerReadAllResponse(params: TopicControllerService.TopicControllerReadAllParams): Observable<StrictHttpResponse<{}>> {
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
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
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
  topicControllerReadAll(params: TopicControllerService.TopicControllerReadAllParams): Observable<{}> {
    return this.topicControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newTopic newTopic
   * @return OK
   */
  topicControllerCreateResponse(newTopic: TopicEntity): Observable<StrictHttpResponse<{}>> {
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
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newTopic newTopic
   * @return OK
   */
  topicControllerCreate(newTopic: TopicEntity): Observable<{}> {
    return this.topicControllerCreateResponse(newTopic).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param topicId topicId
   * @return OK
   */
  topicControllerReadOneResponse(topicId: string): Observable<StrictHttpResponse<ResourceTopicEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/topics/${topicId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceTopicEntity>;
      })
    );
  }
  /**
   * @param topicId topicId
   * @return OK
   */
  topicControllerReadOne(topicId: string): Observable<ResourceTopicEntity> {
    return this.topicControllerReadOneResponse(topicId).pipe(
      __map(_r => _r.body as ResourceTopicEntity)
    );
  }

  /**
   * @param newTopic newTopic
   * @param topicId topicId
   * @return OK
   */
  topicControllerUpdateResponse(newTopic: TopicEntity,
    topicId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newTopic;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/topics/${topicId}`,
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
   * @param newTopic newTopic
   * @param topicId topicId
   * @return OK
   */
  topicControllerUpdate(newTopic: TopicEntity,
    topicId: string): Observable<{}> {
    return this.topicControllerUpdateResponse(newTopic, topicId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param topicId topicId
   * @return OK
   */
  topicControllerDeleteResponse(topicId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/topics/${topicId}`,
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
   * @param topicId topicId
   * @return OK
   */
  topicControllerDelete(topicId: string): Observable<{}> {
    return this.topicControllerDeleteResponse(topicId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param topicId topicId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  topicControllerReadPagesResponse(topicId: string,
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
      this.rootUrl + `/topics/${topicId}/pages`,
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
   * @param topicId topicId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  topicControllerReadPages(topicId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): Observable<{}> {
    return this.topicControllerReadPagesResponse(topicId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param topicId topicId
   * @return OK
   */
  topicControllerReadTranslationsResponse(topicId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/topics/${topicId}/translations`,
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
   * @param topicId topicId
   * @return OK
   */
  topicControllerReadTranslations(topicId: string): Observable<{}> {
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
