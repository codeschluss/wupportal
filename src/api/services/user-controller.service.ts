/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
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
class UserControllerService extends __BaseService {
  static readonly userControllerReadAllPath = '/users';
  static readonly userControllerCreatePath = '/users';
  static readonly userControllerApplyAsBloggerPath = '/users/blogapply';
  static readonly userControllerReadAllBloggersPath = '/users/bloggers';
  static readonly userControllerResetAllPasswordsPath = '/users/resetallpasswords';
  static readonly userControllerResetPasswordPath = '/users/resetpassword';
  static readonly userControllerReadOnePath = '/users/{userId}';
  static readonly userControllerUpdatePath = '/users/{userId}';
  static readonly userControllerDeletePath = '/users/{userId}';
  static readonly userControllerReadActivitiesPath = '/users/{userId}/activities';
  static readonly userControllerDeleteActivityPath = '/users/{userId}/activities/{activityId}';
  static readonly userControllerReadBloggerPath = '/users/{userId}/blogger';
  static readonly userControllerDeleteBloggerPath = '/users/{userId}/blogger';
  static readonly userControllerReadBlogsPath = '/users/{userId}/blogs';
  static readonly userControllerDeleteBlogPath = '/users/{userId}/blogs/{blogId}';
  static readonly userControllerGrantBloggerRightPath = '/users/{userId}/grantblogger';
  static readonly userControllerReadOrganisationsPath = '/users/{userId}/organisations';
  static readonly userControllerAddOrganisationPath = '/users/{userId}/organisations';
  static readonly userControllerDeleteOrganisationPath = '/users/{userId}/organisations/{orgaId}';
  static readonly userControllerGrantSuperuserRightPath = '/users/{userId}/superuser';
  static readonly userControllerGrantTranslatorRightPath = '/users/{userId}/translator';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
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
  userControllerReadAllResponse(params: UserControllerService.UserControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readAll
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
  userControllerReadAll(params: UserControllerService.UserControllerReadAllParams): __Observable<{}> {
    return this.userControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newUser newUser
   * @return OK
   */
  userControllerCreateResponse(newUser: UserEntity): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * create
   * @param newUser newUser
   * @return OK
   */
  userControllerCreate(newUser: UserEntity): __Observable<{}> {
    return this.userControllerCreateResponse(newUser).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * applyAsBlogger
   * @return OK
   */
  userControllerApplyAsBloggerResponse(): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * applyAsBlogger
   * @return OK
   */
  userControllerApplyAsBlogger(): __Observable<{}> {
    return this.userControllerApplyAsBloggerResponse().pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readAllBloggers
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
  userControllerReadAllBloggersResponse(params: UserControllerService.UserControllerReadAllBloggersParams): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readAllBloggers
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
  userControllerReadAllBloggers(params: UserControllerService.UserControllerReadAllBloggersParams): __Observable<{}> {
    return this.userControllerReadAllBloggersResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * resetAllPasswords
   * @return OK
   */
  userControllerResetAllPasswordsResponse(): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/resetallpasswords`,
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
   * resetAllPasswords
   * @return OK
   */
  userControllerResetAllPasswords(): __Observable<{}> {
    return this.userControllerResetAllPasswordsResponse().pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * resetPassword
   * @param username username
   * @return OK
   */
  userControllerResetPasswordResponse(username: StringPrimitive): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * resetPassword
   * @param username username
   * @return OK
   */
  userControllerResetPassword(username: StringPrimitive): __Observable<{}> {
    return this.userControllerResetPasswordResponse(username).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param userId userId
   * @return OK
   */
  userControllerReadOneResponse(userId: string): __Observable<__StrictHttpResponse<ResourceUserEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceUserEntity>;
      })
    );
  }
  /**
   * readOne
   * @param userId userId
   * @return OK
   */
  userControllerReadOne(userId: string): __Observable<ResourceUserEntity> {
    return this.userControllerReadOneResponse(userId).pipe(
      __map(_r => _r.body as ResourceUserEntity)
    );
  }

  /**
   * update
   * @param newUser newUser
   * @param userId userId
   * @return OK
   */
  userControllerUpdateResponse(newUser: UserEntity,
    userId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newUser;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}`,
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
   * @param newUser newUser
   * @param userId userId
   * @return OK
   */
  userControllerUpdate(newUser: UserEntity,
    userId: string): __Observable<{}> {
    return this.userControllerUpdateResponse(newUser, userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param userId userId
   * @return OK
   */
  userControllerDeleteResponse(userId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}`,
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
   * @param userId userId
   * @return OK
   */
  userControllerDelete(userId: string): __Observable<{}> {
    return this.userControllerDeleteResponse(userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readActivities
   * @param userId userId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadActivitiesResponse(userId: string,
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
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/activities`,
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
   * readActivities
   * @param userId userId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadActivities(userId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.userControllerReadActivitiesResponse(userId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteActivity
   * @param userId userId
   * @param activityId activityId
   * @return OK
   */
  userControllerDeleteActivityResponse(userId: string,
    activityId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/activities/${encodeURIComponent(String(activityId))}`,
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
   * deleteActivity
   * @param userId userId
   * @param activityId activityId
   * @return OK
   */
  userControllerDeleteActivity(userId: string,
    activityId: string): __Observable<{}> {
    return this.userControllerDeleteActivityResponse(userId, activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readBlogger
   * @param userId userId
   * @return OK
   */
  userControllerReadBloggerResponse(userId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/blogger`,
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
   * @param userId userId
   * @return OK
   */
  userControllerReadBlogger(userId: string): __Observable<{}> {
    return this.userControllerReadBloggerResponse(userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteBlogger
   * @param userId userId
   * @return OK
   */
  userControllerDeleteBloggerResponse(userId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/blogger`,
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
   * deleteBlogger
   * @param userId userId
   * @return OK
   */
  userControllerDeleteBlogger(userId: string): __Observable<{}> {
    return this.userControllerDeleteBloggerResponse(userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readBlogs
   * @param userId userId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadBlogsResponse(userId: string,
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
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/blogs`,
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
   * @param userId userId
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadBlogs(userId: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.userControllerReadBlogsResponse(userId, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteBlog
   * @param userId userId
   * @param blogId blogId
   * @return OK
   */
  userControllerDeleteBlogResponse(userId: string,
    blogId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/blogs/${encodeURIComponent(String(blogId))}`,
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
   * deleteBlog
   * @param userId userId
   * @param blogId blogId
   * @return OK
   */
  userControllerDeleteBlog(userId: string,
    blogId: string): __Observable<{}> {
    return this.userControllerDeleteBlogResponse(userId, blogId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * grantBloggerRight
   * @param userId userId
   * @param isBlogger isBlogger
   * @return OK
   */
  userControllerGrantBloggerRightResponse(userId: string,
    isBlogger: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isBlogger;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/grantblogger`,
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
   * grantBloggerRight
   * @param userId userId
   * @param isBlogger isBlogger
   * @return OK
   */
  userControllerGrantBloggerRight(userId: string,
    isBlogger: BooleanPrimitive): __Observable<{}> {
    return this.userControllerGrantBloggerRightResponse(userId, isBlogger).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOrganisations
   * @param userId userId
   * @return OK
   */
  userControllerReadOrganisationsResponse(userId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/organisations`,
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
   * readOrganisations
   * @param userId userId
   * @return OK
   */
  userControllerReadOrganisations(userId: string): __Observable<{}> {
    return this.userControllerReadOrganisationsResponse(userId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addOrganisation
   * @param userId userId
   * @param organisationParam organisationParam
   * @return OK
   */
  userControllerAddOrganisationResponse(userId: string,
    organisationParam: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = organisationParam;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/organisations`,
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
   * addOrganisation
   * @param userId userId
   * @param organisationParam organisationParam
   * @return OK
   */
  userControllerAddOrganisation(userId: string,
    organisationParam: Array<string>): __Observable<{}> {
    return this.userControllerAddOrganisationResponse(userId, organisationParam).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteOrganisation
   * @param userId userId
   * @param orgaId orgaId
   * @return OK
   */
  userControllerDeleteOrganisationResponse(userId: string,
    orgaId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/organisations/${encodeURIComponent(String(orgaId))}`,
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
   * deleteOrganisation
   * @param userId userId
   * @param orgaId orgaId
   * @return OK
   */
  userControllerDeleteOrganisation(userId: string,
    orgaId: string): __Observable<{}> {
    return this.userControllerDeleteOrganisationResponse(userId, orgaId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * grantSuperuserRight
   * @param userId userId
   * @param isSuperuser isSuperuser
   * @return OK
   */
  userControllerGrantSuperuserRightResponse(userId: string,
    isSuperuser: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isSuperuser;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/superuser`,
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
   * grantSuperuserRight
   * @param userId userId
   * @param isSuperuser isSuperuser
   * @return OK
   */
  userControllerGrantSuperuserRight(userId: string,
    isSuperuser: BooleanPrimitive): __Observable<{}> {
    return this.userControllerGrantSuperuserRightResponse(userId, isSuperuser).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * grantTranslatorRight
   * @param userId userId
   * @param isTranslator isTranslator
   * @return OK
   */
  userControllerGrantTranslatorRightResponse(userId: string,
    isTranslator: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isTranslator;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${encodeURIComponent(String(userId))}/translator`,
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
   * grantTranslatorRight
   * @param userId userId
   * @param isTranslator isTranslator
   * @return OK
   */
  userControllerGrantTranslatorRight(userId: string,
    isTranslator: BooleanPrimitive): __Observable<{}> {
    return this.userControllerGrantTranslatorRightResponse(userId, isTranslator).pipe(
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
