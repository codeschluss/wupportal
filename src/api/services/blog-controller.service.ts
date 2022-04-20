/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { BlogEntity } from '../models/blog-entity';
import { VisitableEntityObject } from '../models/visitable-entity-object';
import { ResourceBlogEntity } from '../models/resource-blog-entity';
import { BooleanPrimitive } from '../models/boolean-primitive';
import { ImageEntity } from '../models/image-entity';
import { StringPrimitive } from '../models/string-primitive';

/**
 * Blog Controller
 */
@Injectable({
  providedIn: 'root',
})
class BlogControllerService extends __BaseService {
  static readonly blogControllerReadAllPath = '/blogs';
  static readonly blogControllerCreatePath = '/blogs';
  static readonly blogControllerCalculateOverviewVisitorsPath = '/blogs/visitors';
  static readonly blogControllerReadOnePath = '/blogs/{id}';
  static readonly blogControllerUpdatePath = '/blogs/{id}';
  static readonly blogControllerDeletePath = '/blogs/{id}';
  static readonly blogControllerGrantApprovalPath = '/blogs/{id}/approve';
  static readonly blogControllerReadBloggerPath = '/blogs/{id}/blogger';
  static readonly blogControllerReadImagesPath = '/blogs/{id}/images';
  static readonly blogControllerAddImagePath = '/blogs/{id}/images';
  static readonly blogControllerDeleteImagesPath = '/blogs/{id}/images';
  static readonly blogControllerIncreaseLikePath = '/blogs/{id}/like';
  static readonly blogControllerReadTitleImagePath = '/blogs/{id}/titleimage';
  static readonly blogControllerAddTitleImagePath = '/blogs/{id}/titleimage';
  static readonly blogControllerReadTopicPath = '/blogs/{id}/topic';
  static readonly blogControllerUpdateTopicPath = '/blogs/{id}/topic';
  static readonly blogControllerReadTranslationsPath = '/blogs/{id}/translations';
  static readonly blogControllerCalculateVisitorsPath = '/blogs/{id}/visitors';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `BlogControllerService.BlogControllerReadAllParams` containing the following parameters:
   *
   * - `topics`:
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
  blogControllerReadAllResponse(params: BlogControllerService.BlogControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.topics || []).forEach(val => {if (val != null) __params = __params.append('topics', val.toString())});
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
    if (params.embeddings != null) __params = __params.set('embeddings', params.embeddings.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.filter != null) __params = __params.set('filter', params.filter.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs`,
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
   * @param params The `BlogControllerService.BlogControllerReadAllParams` containing the following parameters:
   *
   * - `topics`:
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
  blogControllerReadAll(params: BlogControllerService.BlogControllerReadAllParams): __Observable<{}> {
    return this.blogControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newBlog newBlog
   * @return OK
   */
  blogControllerCreateResponse(newBlog: BlogEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newBlog;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/blogs`,
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
   * @param newBlog newBlog
   * @return OK
   */
  blogControllerCreate(newBlog: BlogEntity): __Observable<{}> {
    return this.blogControllerCreateResponse(newBlog).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * calculateOverviewVisitors
   * @return OK
   */
  blogControllerCalculateOverviewVisitorsResponse(): __Observable<__StrictHttpResponse<Array<VisitableEntityObject>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/visitors`,
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
  blogControllerCalculateOverviewVisitors(): __Observable<Array<VisitableEntityObject>> {
    return this.blogControllerCalculateOverviewVisitorsResponse().pipe(
      __map(_r => _r.body as Array<VisitableEntityObject>)
    );
  }

  /**
   * readOne
   * @param id id
   * @return OK
   */
  blogControllerReadOneResponse(id: string): __Observable<__StrictHttpResponse<ResourceBlogEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceBlogEntity>;
      })
    );
  }
  /**
   * readOne
   * @param id id
   * @return OK
   */
  blogControllerReadOne(id: string): __Observable<ResourceBlogEntity> {
    return this.blogControllerReadOneResponse(id).pipe(
      __map(_r => _r.body as ResourceBlogEntity)
    );
  }

  /**
   * update
   * @param newBlog newBlog
   * @param id id
   * @return OK
   */
  blogControllerUpdateResponse(newBlog: BlogEntity,
    id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newBlog;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}`,
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
   * @param newBlog newBlog
   * @param id id
   * @return OK
   */
  blogControllerUpdate(newBlog: BlogEntity,
    id: string): __Observable<{}> {
    return this.blogControllerUpdateResponse(newBlog, id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param id id
   * @return OK
   */
  blogControllerDeleteResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}`,
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
  blogControllerDelete(id: string): __Observable<{}> {
    return this.blogControllerDeleteResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * grantApproval
   * @param id id
   * @param isApproved isApproved
   * @return OK
   */
  blogControllerGrantApprovalResponse(id: string,
    isApproved: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isApproved;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/approve`,
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
  blogControllerGrantApproval(id: string,
    isApproved: BooleanPrimitive): __Observable<{}> {
    return this.blogControllerGrantApprovalResponse(id, isApproved).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readBlogger
   * @param id id
   * @return OK
   */
  blogControllerReadBloggerResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/blogger`,
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
   * readBlogger
   * @param id id
   * @return OK
   */
  blogControllerReadBlogger(id: string): __Observable<{}> {
    return this.blogControllerReadBloggerResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readImages
   * @param id id
   * @return OK
   */
  blogControllerReadImagesResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/images`,
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
  blogControllerReadImages(id: string): __Observable<{}> {
    return this.blogControllerReadImagesResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addImage
   * @param id id
   * @param images images
   * @return OK
   */
  blogControllerAddImageResponse(id: string,
    images: Array<ImageEntity>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = images;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/images`,
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
  blogControllerAddImage(id: string,
    images: Array<ImageEntity>): __Observable<{}> {
    return this.blogControllerAddImageResponse(id, images).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteImages
   * @param id id
   * @param imageIds imageIds
   * @return OK
   */
  blogControllerDeleteImagesResponse(id: string,
    imageIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (imageIds || []).forEach(val => {if (val != null) __params = __params.append('imageIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/images`,
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
  blogControllerDeleteImages(id: string,
    imageIds: Array<string>): __Observable<{}> {
    return this.blogControllerDeleteImagesResponse(id, imageIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * increaseLike
   * @param id id
   * @param subscriptionId subscriptionId
   * @return OK
   */
  blogControllerIncreaseLikeResponse(id: string,
    subscriptionId?: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = subscriptionId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/like`,
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
  blogControllerIncreaseLike(id: string,
    subscriptionId?: StringPrimitive): __Observable<{}> {
    return this.blogControllerIncreaseLikeResponse(id, subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTitleImage
   * @param id id
   * @return OK
   */
  blogControllerReadTitleImageResponse(id: string): __Observable<__StrictHttpResponse<ImageEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/titleimage`,
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
  blogControllerReadTitleImage(id: string): __Observable<ImageEntity> {
    return this.blogControllerReadTitleImageResponse(id).pipe(
      __map(_r => _r.body as ImageEntity)
    );
  }

  /**
   * addTitleImage
   * @param id id
   * @param titleImage titleImage
   * @return OK
   */
  blogControllerAddTitleImageResponse(id: string,
    titleImage: ImageEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = titleImage;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/titleimage`,
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
  blogControllerAddTitleImage(id: string,
    titleImage: ImageEntity): __Observable<{}> {
    return this.blogControllerAddTitleImageResponse(id, titleImage).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTopic
   * @param id id
   * @return OK
   */
  blogControllerReadTopicResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/topic`,
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
   * readTopic
   * @param id id
   * @return OK
   */
  blogControllerReadTopic(id: string): __Observable<{}> {
    return this.blogControllerReadTopicResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * updateTopic
   * @param id id
   * @param topicId topicId
   * @return OK
   */
  blogControllerUpdateTopicResponse(id: string,
    topicId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = topicId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/topic`,
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
   * updateTopic
   * @param id id
   * @param topicId topicId
   * @return OK
   */
  blogControllerUpdateTopic(id: string,
    topicId: StringPrimitive): __Observable<{}> {
    return this.blogControllerUpdateTopicResponse(id, topicId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param id id
   * @return OK
   */
  blogControllerReadTranslationsResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/translations`,
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
  blogControllerReadTranslations(id: string): __Observable<{}> {
    return this.blogControllerReadTranslationsResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * calculateVisitors
   * @param id id
   * @return OK
   */
  blogControllerCalculateVisitorsResponse(id: string): __Observable<__StrictHttpResponse<Array<VisitableEntityObject>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(id))}/visitors`,
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
  blogControllerCalculateVisitors(id: string): __Observable<Array<VisitableEntityObject>> {
    return this.blogControllerCalculateVisitorsResponse(id).pipe(
      __map(_r => _r.body as Array<VisitableEntityObject>)
    );
  }
}

module BlogControllerService {

  /**
   * Parameters for blogControllerReadAll
   */
  export interface BlogControllerReadAllParams {
    topics?: Array<string>;
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { BlogControllerService }
