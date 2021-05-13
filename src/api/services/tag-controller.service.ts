/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TagEntity } from '../models/tag-entity';
import { ResourceTagEntity } from '../models/resource-tag-entity';

/**
 * Tag Controller
 */
@Injectable({
  providedIn: 'root',
})
class TagControllerService extends __BaseService {
  static readonly tagControllerReadAllPath = '/tags';
  static readonly tagControllerCreatePath = '/tags';
  static readonly tagControllerReadOnePath = '/tags/{tagId}';
  static readonly tagControllerUpdatePath = '/tags/{tagId}';
  static readonly tagControllerDeletePath = '/tags/{tagId}';
  static readonly tagControllerReadTranslationsPath = '/tags/{tagId}/translations';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `TagControllerService.TagControllerReadAllParams` containing the following parameters:
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
  tagControllerReadAllResponse(params: TagControllerService.TagControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
      this.rootUrl + `/tags`,
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
   * @param params The `TagControllerService.TagControllerReadAllParams` containing the following parameters:
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
  tagControllerReadAll(params: TagControllerService.TagControllerReadAllParams): __Observable<{}> {
    return this.tagControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newTag newTag
   * @return OK
   */
  tagControllerCreateResponse(newTag: TagEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newTag;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tags`,
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
   * @param newTag newTag
   * @return OK
   */
  tagControllerCreate(newTag: TagEntity): __Observable<{}> {
    return this.tagControllerCreateResponse(newTag).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param tagId tagId
   * @return OK
   */
  tagControllerReadOneResponse(tagId: string): __Observable<__StrictHttpResponse<ResourceTagEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tags/${encodeURIComponent(String(tagId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceTagEntity>;
      })
    );
  }
  /**
   * readOne
   * @param tagId tagId
   * @return OK
   */
  tagControllerReadOne(tagId: string): __Observable<ResourceTagEntity> {
    return this.tagControllerReadOneResponse(tagId).pipe(
      __map(_r => _r.body as ResourceTagEntity)
    );
  }

  /**
   * update
   * @param newTag newTag
   * @param tagId tagId
   * @return OK
   */
  tagControllerUpdateResponse(newTag: TagEntity,
    tagId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newTag;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tags/${encodeURIComponent(String(tagId))}`,
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
   * @param newTag newTag
   * @param tagId tagId
   * @return OK
   */
  tagControllerUpdate(newTag: TagEntity,
    tagId: string): __Observable<{}> {
    return this.tagControllerUpdateResponse(newTag, tagId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param tagId tagId
   * @return OK
   */
  tagControllerDeleteResponse(tagId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tags/${encodeURIComponent(String(tagId))}`,
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
   * @param tagId tagId
   * @return OK
   */
  tagControllerDelete(tagId: string): __Observable<{}> {
    return this.tagControllerDeleteResponse(tagId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param tagId tagId
   * @return OK
   */
  tagControllerReadTranslationsResponse(tagId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tags/${encodeURIComponent(String(tagId))}/translations`,
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
   * @param tagId tagId
   * @return OK
   */
  tagControllerReadTranslations(tagId: string): __Observable<{}> {
    return this.tagControllerReadTranslationsResponse(tagId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module TagControllerService {

  /**
   * Parameters for tagControllerReadAll
   */
  export interface TagControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { TagControllerService }
