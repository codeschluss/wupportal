/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserEntity } from '../models/user-entity';
import { StringPrimitive } from '../models/string-primitive';
import { ResourceUserEntity } from '../models/resource-user-entity';
import { BooleanPrimitive } from '../models/boolean-primitive';

/**
 * User Controller
 */
@Injectable({
  providedIn: 'root',
})
class UserControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `UserControllerService.UserControllerReadAllParams` containing the following parameters:
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
  userControllerReadAllResponse(params: UserControllerService.UserControllerReadAllParams): Observable<StrictHttpResponse<{}>> {
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
      this.rootUrl + `/users`,
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
   * @param params The `UserControllerService.UserControllerReadAllParams` containing the following parameters:
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
  userControllerReadAll(params: UserControllerService.UserControllerReadAllParams): Observable<{}> {
    return this.userControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newUser newUser
   * @return OK
   */
  userControllerCreateResponse(newUser: UserEntity): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newUser;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/users`,
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
   * @param newUser newUser
   * @return OK
   */
  userControllerCreate(newUser: UserEntity): Observable<{}> {
    return this.userControllerCreateResponse(newUser).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @return OK
   */
  userControllerApplyAsBloggerResponse(): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/users/blogapply`,
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
   * @return OK
   */
  userControllerApplyAsBlogger(): Observable<{}> {
    return this.userControllerApplyAsBloggerResponse().pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param params The `UserControllerService.UserControllerReadAllBloggersParams` containing the following parameters:
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
  userControllerReadAllBloggersResponse(params: UserControllerService.UserControllerReadAllBloggersParams): Observable<StrictHttpResponse<{}>> {
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
      this.rootUrl + `/users/bloggers`,
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
   * @param params The `UserControllerService.UserControllerReadAllBloggersParams` containing the following parameters:
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
  userControllerReadAllBloggers(params: UserControllerService.UserControllerReadAllBloggersParams): Observable<{}> {
    return this.userControllerReadAllBloggersResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param username username
   * @return OK
   */
  userControllerResetPasswordResponse(username: StringPrimitive): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = username;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/resetpassword`,
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
   * @param username username
   * @return OK
   */
  userControllerResetPassword(username: StringPrimitive): Observable<{}> {
    return this.userControllerResetPasswordResponse(username).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @return OK
   */
  userControllerReadOneResponse(userId: string): Observable<StrictHttpResponse<ResourceUserEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/${userId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceUserEntity>;
      })
    );
  }
  /**
   * @param userId userId
   * @return OK
   */
  userControllerReadOne(userId: string): Observable<ResourceUserEntity> {
    return this.userControllerReadOneResponse(userId).pipe(
      __map(_r => _r.body as ResourceUserEntity)
    );
  }

  /**
   * @param newUser newUser
   * @param userId userId
   * @return OK
   */
  userControllerUpdateResponse(newUser: UserEntity,
    userId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newUser;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${userId}`,
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
   * @param newUser newUser
   * @param userId userId
   * @return OK
   */
  userControllerUpdate(newUser: UserEntity,
    userId: string): Observable<{}> {
    return this.userControllerUpdateResponse(newUser, userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @return OK
   */
  userControllerDeleteResponse(userId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${userId}`,
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
   * @param userId userId
   * @return OK
   */
  userControllerDelete(userId: string): Observable<{}> {
    return this.userControllerDeleteResponse(userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadActivitiesResponse(userId: string,
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
      this.rootUrl + `/users/${userId}/activities`,
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
   * @param userId userId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadActivities(userId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): Observable<{}> {
    return this.userControllerReadActivitiesResponse(userId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @param activityId activityId
   * @return OK
   */
  userControllerDeleteActivityResponse(userId: string,
    activityId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${userId}/activities/${activityId}`,
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
   * @param userId userId
   * @param activityId activityId
   * @return OK
   */
  userControllerDeleteActivity(userId: string,
    activityId: string): Observable<{}> {
    return this.userControllerDeleteActivityResponse(userId, activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @return OK
   */
  userControllerReadBloggerResponse(userId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/${userId}/blogger`,
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
   * @param userId userId
   * @return OK
   */
  userControllerReadBlogger(userId: string): Observable<{}> {
    return this.userControllerReadBloggerResponse(userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @return OK
   */
  userControllerDeleteBloggerResponse(userId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${userId}/blogger`,
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
   * @param userId userId
   * @return OK
   */
  userControllerDeleteBlogger(userId: string): Observable<{}> {
    return this.userControllerDeleteBloggerResponse(userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadBlogsResponse(userId: string,
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
      this.rootUrl + `/users/${userId}/blogs`,
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
   * @param userId userId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadBlogs(userId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): Observable<{}> {
    return this.userControllerReadBlogsResponse(userId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @param blogId blogId
   * @return OK
   */
  userControllerDeleteBlogResponse(userId: string,
    blogId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${userId}/blogs/${blogId}`,
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
   * @param userId userId
   * @param blogId blogId
   * @return OK
   */
  userControllerDeleteBlog(userId: string,
    blogId: string): Observable<{}> {
    return this.userControllerDeleteBlogResponse(userId, blogId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @param isBlogger isBlogger
   * @return OK
   */
  userControllerGrantBloggerRightResponse(userId: string,
    isBlogger: BooleanPrimitive): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isBlogger;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${userId}/grantblogger`,
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
   * @param userId userId
   * @param isBlogger isBlogger
   * @return OK
   */
  userControllerGrantBloggerRight(userId: string,
    isBlogger: BooleanPrimitive): Observable<{}> {
    return this.userControllerGrantBloggerRightResponse(userId, isBlogger).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @return OK
   */
  userControllerReadOrganisationsResponse(userId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/${userId}/organisations`,
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
   * @param userId userId
   * @return OK
   */
  userControllerReadOrganisations(userId: string): Observable<{}> {
    return this.userControllerReadOrganisationsResponse(userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @param organisationParam organisationParam
   * @return OK
   */
  userControllerAddOrganisationResponse(userId: string,
    organisationParam: Array<string>): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = organisationParam;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/users/${userId}/organisations`,
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
   * @param userId userId
   * @param organisationParam organisationParam
   * @return OK
   */
  userControllerAddOrganisation(userId: string,
    organisationParam: Array<string>): Observable<{}> {
    return this.userControllerAddOrganisationResponse(userId, organisationParam).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @param orgaId orgaId
   * @return OK
   */
  userControllerDeleteOrganisationResponse(userId: string,
    orgaId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${userId}/organisations/${orgaId}`,
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
   * @param userId userId
   * @param orgaId orgaId
   * @return OK
   */
  userControllerDeleteOrganisation(userId: string,
    orgaId: string): Observable<{}> {
    return this.userControllerDeleteOrganisationResponse(userId, orgaId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @param isSuperuser isSuperuser
   * @return OK
   */
  userControllerGrantSuperuserRightResponse(userId: string,
    isSuperuser: BooleanPrimitive): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isSuperuser;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${userId}/superuser`,
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
   * @param userId userId
   * @param isSuperuser isSuperuser
   * @return OK
   */
  userControllerGrantSuperuserRight(userId: string,
    isSuperuser: BooleanPrimitive): Observable<{}> {
    return this.userControllerGrantSuperuserRightResponse(userId, isSuperuser).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module UserControllerService {

  /**
   * Parameters for userControllerReadAll
   */
  export interface UserControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }

  /**
   * Parameters for userControllerReadAllBloggers
   */
  export interface UserControllerReadAllBloggersParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { UserControllerService }
