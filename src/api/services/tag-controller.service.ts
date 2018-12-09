/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TagEntity } from '../models/tag-entity';
import { ResourceTagEntity } from '../models/resource-tag-entity';

/**
 * Tag Controller
 */
@Injectable({
  providedIn: 'root',
})
class TagControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `TagControllerService.TagControllerReadAllParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * @return OK
   */
  tagControllerReadAllResponse(params: TagControllerService.TagControllerReadAllParams): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
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
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param params The `TagControllerService.TagControllerReadAllParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * @return OK
   */
  tagControllerReadAll(params: TagControllerService.TagControllerReadAllParams): Observable<{}> {
    return this.tagControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newTag newTag
   * @return OK
   */
  tagControllerCreateResponse(newTag: TagEntity): Observable<StrictHttpResponse<{}>> {
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
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newTag newTag
   * @return OK
   */
  tagControllerCreate(newTag: TagEntity): Observable<{}> {
    return this.tagControllerCreateResponse(newTag).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param tagId tagId
   * @return OK
   */
  tagControllerReadOneResponse(tagId: string): Observable<StrictHttpResponse<ResourceTagEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tags/${tagId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceTagEntity>;
      })
    );
  }
  /**
   * @param tagId tagId
   * @return OK
   */
  tagControllerReadOne(tagId: string): Observable<ResourceTagEntity> {
    return this.tagControllerReadOneResponse(tagId).pipe(
      __map(_r => _r.body as ResourceTagEntity)
    );
  }

  /**
   * @param newTag newTag
   * @param tagId tagId
   * @return OK
   */
  tagControllerUpdateResponse(newTag: TagEntity,
    tagId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newTag;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tags/${tagId}`,
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
   * @param newTag newTag
   * @param tagId tagId
   * @return OK
   */
  tagControllerUpdate(newTag: TagEntity,
    tagId: string): Observable<{}> {
    return this.tagControllerUpdateResponse(newTag, tagId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param tagId tagId
   * @return OK
   */
  tagControllerDeleteResponse(tagId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tags/${tagId}`,
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
   * @param tagId tagId
   * @return OK
   */
  tagControllerDelete(tagId: string): Observable<{}> {
    return this.tagControllerDeleteResponse(tagId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param tagId tagId
   * @return OK
   */
  tagControllerReadTranslationsResponse(tagId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tags/${tagId}/translations`,
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
   * @param tagId tagId
   * @return OK
   */
  tagControllerReadTranslations(tagId: string): Observable<{}> {
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
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { TagControllerService }
