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
  static readonly socialMediaControllerReadOnePath = '/socialmedia/{id}';
  static readonly socialMediaControllerUpdatePath = '/socialmedia/{id}';
  static readonly socialMediaControllerDeletePath = '/socialmedia/{id}';

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
   * @param id id
   * @return OK
   */
  socialMediaControllerReadOneResponse(id: string): __Observable<__StrictHttpResponse<ResourceSocialMediaEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/socialmedia/${encodeURIComponent(String(id))}`,
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
   * @param id id
   * @return OK
   */
  socialMediaControllerReadOne(id: string): __Observable<ResourceSocialMediaEntity> {
    return this.socialMediaControllerReadOneResponse(id).pipe(
      __map(_r => _r.body as ResourceSocialMediaEntity)
    );
  }

  /**
   * update
   * @param newSocialMedia newSocialMedia
   * @param id id
   * @return OK
   */
  socialMediaControllerUpdateResponse(newSocialMedia: SocialMediaEntity,
    id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newSocialMedia;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/socialmedia/${encodeURIComponent(String(id))}`,
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
   * @param id id
   * @return OK
   */
  socialMediaControllerUpdate(newSocialMedia: SocialMediaEntity,
    id: string): __Observable<{}> {
    return this.socialMediaControllerUpdateResponse(newSocialMedia, id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param id id
   * @return OK
   */
  socialMediaControllerDeleteResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/socialmedia/${encodeURIComponent(String(id))}`,
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
  socialMediaControllerDelete(id: string): __Observable<{}> {
    return this.socialMediaControllerDeleteResponse(id).pipe(
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
