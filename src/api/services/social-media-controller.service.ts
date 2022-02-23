/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { SocialMediaEntity } from '../models/social-media-entity';
import { ResourceSocialMediaEntity } from '../models/resource-social-media-entity';

/**
 * Social Media Controller
 */
@Injectable({
  providedIn: 'root',
})
class SocialMediaControllerService extends __BaseService {
  static readonly socialMediaControllerReadAllPath = '/socialmedia';
  static readonly socialMediaControllerCreatePath = '/socialmedia';
  static readonly socialMediaControllerReadOnePath = '/socialmedia/{socialmediaId}';
  static readonly socialMediaControllerUpdatePath = '/socialmedia/{socialmediaId}';
  static readonly socialMediaControllerDeletePath = '/socialmedia/{socialmediaId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `SocialMediaControllerService.SocialMediaControllerReadAllParams` containing the following parameters:
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
  socialMediaControllerReadAllResponse(params: SocialMediaControllerService.SocialMediaControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
      this.rootUrl + `/socialmedia`,
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
   * @param params The `SocialMediaControllerService.SocialMediaControllerReadAllParams` containing the following parameters:
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
  socialMediaControllerReadAll(params: SocialMediaControllerService.SocialMediaControllerReadAllParams): __Observable<{}> {
    return this.socialMediaControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newSocialMedia newSocialMedia
   * @return OK
   */
  socialMediaControllerCreateResponse(newSocialMedia: SocialMediaEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newSocialMedia;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/socialmedia`,
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
   * @param newSocialMedia newSocialMedia
   * @return OK
   */
  socialMediaControllerCreate(newSocialMedia: SocialMediaEntity): __Observable<{}> {
    return this.socialMediaControllerCreateResponse(newSocialMedia).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param socialmediaId socialmediaId
   * @return OK
   */
  socialMediaControllerReadOneResponse(socialmediaId: string): __Observable<__StrictHttpResponse<ResourceSocialMediaEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/socialmedia/${encodeURIComponent(String(socialmediaId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceSocialMediaEntity>;
      })
    );
  }
  /**
   * readOne
   * @param socialmediaId socialmediaId
   * @return OK
   */
  socialMediaControllerReadOne(socialmediaId: string): __Observable<ResourceSocialMediaEntity> {
    return this.socialMediaControllerReadOneResponse(socialmediaId).pipe(
      __map(_r => _r.body as ResourceSocialMediaEntity)
    );
  }

  /**
   * update
   * @param newSocialMedia newSocialMedia
   * @param socialmediaId socialmediaId
   * @return OK
   */
  socialMediaControllerUpdateResponse(newSocialMedia: SocialMediaEntity,
    socialmediaId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newSocialMedia;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/socialmedia/${encodeURIComponent(String(socialmediaId))}`,
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
   * @param newSocialMedia newSocialMedia
   * @param socialmediaId socialmediaId
   * @return OK
   */
  socialMediaControllerUpdate(newSocialMedia: SocialMediaEntity,
    socialmediaId: string): __Observable<{}> {
    return this.socialMediaControllerUpdateResponse(newSocialMedia, socialmediaId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param socialmediaId socialmediaId
   * @return OK
   */
  socialMediaControllerDeleteResponse(socialmediaId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/socialmedia/${encodeURIComponent(String(socialmediaId))}`,
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
   * @param socialmediaId socialmediaId
   * @return OK
   */
  socialMediaControllerDelete(socialmediaId: string): __Observable<{}> {
    return this.socialMediaControllerDeleteResponse(socialmediaId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module SocialMediaControllerService {

  /**
   * Parameters for socialMediaControllerReadAll
   */
  export interface SocialMediaControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { SocialMediaControllerService }
