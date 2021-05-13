/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { BlogEntity } from '../models/blog-entity';
import { ResourceBlogEntity } from '../models/resource-blog-entity';
import { StringPrimitive } from '../models/string-primitive';
import { ImageEntity } from '../models/image-entity';

/**
 * Blog Controller
 */
@Injectable({
  providedIn: 'root',
})
class BlogControllerService extends __BaseService {
  static readonly blogControllerReadAllPath = '/blogs';
  static readonly blogControllerCreatePath = '/blogs';
  static readonly blogControllerReadOnePath = '/blogs/{blogId}';
  static readonly blogControllerUpdatePath = '/blogs/{blogId}';
  static readonly blogControllerDeletePath = '/blogs/{blogId}';
  static readonly blogControllerReadActivityPath = '/blogs/{blogId}/activity';
  static readonly blogControllerUpdateActivityPath = '/blogs/{blogId}/activity';
  static readonly blogControllerReadBloggerPath = '/blogs/{blogId}/blogger';
  static readonly blogControllerReadImagesPath = '/blogs/{blogId}/images';
  static readonly blogControllerAddImagePath = '/blogs/{blogId}/images';
  static readonly blogControllerDeleteImagesPath = '/blogs/{blogId}/images';
  static readonly blogControllerIncreaseLikePath = '/blogs/{blogId}/like';
  static readonly blogControllerReadTranslationsPath = '/blogs/{blogId}/translations';

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
   * readOne
   * @param blogId blogId
   * @return OK
   */
  blogControllerReadOneResponse(blogId: string): __Observable<__StrictHttpResponse<ResourceBlogEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(blogId))}`,
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
   * @param blogId blogId
   * @return OK
   */
  blogControllerReadOne(blogId: string): __Observable<ResourceBlogEntity> {
    return this.blogControllerReadOneResponse(blogId).pipe(
      __map(_r => _r.body as ResourceBlogEntity)
    );
  }

  /**
   * update
   * @param newBlog newBlog
   * @param blogId blogId
   * @return OK
   */
  blogControllerUpdateResponse(newBlog: BlogEntity,
    blogId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newBlog;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/blogs/${encodeURIComponent(String(blogId))}`,
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
   * @param blogId blogId
   * @return OK
   */
  blogControllerUpdate(newBlog: BlogEntity,
    blogId: string): __Observable<{}> {
    return this.blogControllerUpdateResponse(newBlog, blogId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param blogId blogId
   * @return OK
   */
  blogControllerDeleteResponse(blogId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/blogs/${encodeURIComponent(String(blogId))}`,
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
   * @param blogId blogId
   * @return OK
   */
  blogControllerDelete(blogId: string): __Observable<{}> {
    return this.blogControllerDeleteResponse(blogId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readActivity
   * @param blogId blogId
   * @return OK
   */
  blogControllerReadActivityResponse(blogId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(blogId))}/activity`,
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
   * readActivity
   * @param blogId blogId
   * @return OK
   */
  blogControllerReadActivity(blogId: string): __Observable<{}> {
    return this.blogControllerReadActivityResponse(blogId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * updateActivity
   * @param blogId blogId
   * @param activityId activityId
   * @return OK
   */
  blogControllerUpdateActivityResponse(blogId: string,
    activityId: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = activityId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/blogs/${encodeURIComponent(String(blogId))}/activity`,
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
   * updateActivity
   * @param blogId blogId
   * @param activityId activityId
   * @return OK
   */
  blogControllerUpdateActivity(blogId: string,
    activityId: StringPrimitive): __Observable<{}> {
    return this.blogControllerUpdateActivityResponse(blogId, activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readBlogger
   * @param blogId blogId
   * @return OK
   */
  blogControllerReadBloggerResponse(blogId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(blogId))}/blogger`,
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
   * @param blogId blogId
   * @return OK
   */
  blogControllerReadBlogger(blogId: string): __Observable<{}> {
    return this.blogControllerReadBloggerResponse(blogId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readImages
   * @param blogId blogId
   * @return OK
   */
  blogControllerReadImagesResponse(blogId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(blogId))}/images`,
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
   * @param blogId blogId
   * @return OK
   */
  blogControllerReadImages(blogId: string): __Observable<{}> {
    return this.blogControllerReadImagesResponse(blogId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addImage
   * @param blogId blogId
   * @param images images
   * @return OK
   */
  blogControllerAddImageResponse(blogId: string,
    images: Array<ImageEntity>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = images;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/blogs/${encodeURIComponent(String(blogId))}/images`,
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
   * @param blogId blogId
   * @param images images
   * @return OK
   */
  blogControllerAddImage(blogId: string,
    images: Array<ImageEntity>): __Observable<{}> {
    return this.blogControllerAddImageResponse(blogId, images).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteImages
   * @param blogId blogId
   * @param imageIds imageIds
   * @return OK
   */
  blogControllerDeleteImagesResponse(blogId: string,
    imageIds: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (imageIds || []).forEach(val => {if (val != null) __params = __params.append('imageIds', val.toString())});
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/blogs/${encodeURIComponent(String(blogId))}/images`,
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
   * @param blogId blogId
   * @param imageIds imageIds
   * @return OK
   */
  blogControllerDeleteImages(blogId: string,
    imageIds: Array<string>): __Observable<{}> {
    return this.blogControllerDeleteImagesResponse(blogId, imageIds).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * increaseLike
   * @param blogId blogId
   * @param subscriptionId subscriptionId
   * @return OK
   */
  blogControllerIncreaseLikeResponse(blogId: string,
    subscriptionId?: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = subscriptionId;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/blogs/${encodeURIComponent(String(blogId))}/like`,
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
   * @param blogId blogId
   * @param subscriptionId subscriptionId
   * @return OK
   */
  blogControllerIncreaseLike(blogId: string,
    subscriptionId?: StringPrimitive): __Observable<{}> {
    return this.blogControllerIncreaseLikeResponse(blogId, subscriptionId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param blogId blogId
   * @return OK
   */
  blogControllerReadTranslationsResponse(blogId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/blogs/${encodeURIComponent(String(blogId))}/translations`,
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
   * @param blogId blogId
   * @return OK
   */
  blogControllerReadTranslations(blogId: string): __Observable<{}> {
    return this.blogControllerReadTranslationsResponse(blogId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module BlogControllerService {

  /**
   * Parameters for blogControllerReadAll
   */
  export interface BlogControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { BlogControllerService }
