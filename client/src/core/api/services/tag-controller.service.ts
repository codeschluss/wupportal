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
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @param dir undefined
   * @param filter undefined
   * @return OK
   */
  tagControllerFindAllResponse(page?: number,
    size?: number,
    sort?: string,
    dir?: string,
    filter?: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    if (size != null) __params = __params.set('size', size.toString());
    if (sort != null) __params = __params.set('sort', sort.toString());
    if (dir != null) __params = __params.set('dir', dir.toString());
    if (filter != null) __params = __params.set('filter', filter.toString());
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
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @param dir undefined
   * @param filter undefined
   * @return OK
   */
  tagControllerFindAll(page?: number,
    size?: number,
    sort?: string,
    dir?: string,
    filter?: string): Observable<{}> {
    return this.tagControllerFindAllResponse(page, size, sort, dir, filter).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newTag newTag
   * @return OK
   */
  tagControllerAddResponse(newTag: TagEntity): Observable<StrictHttpResponse<{}>> {
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
  tagControllerAdd(newTag: TagEntity): Observable<{}> {
    return this.tagControllerAddResponse(newTag).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param tagId tagId
   * @return OK
   */
  tagControllerFindOneResponse(tagId: string): Observable<StrictHttpResponse<ResourceTagEntity>> {
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
  tagControllerFindOne(tagId: string): Observable<ResourceTagEntity> {
    return this.tagControllerFindOneResponse(tagId).pipe(
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
}

module TagControllerService {
}

export { TagControllerService }
