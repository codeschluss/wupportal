/* tslint:disable */
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable as __Observable } from 'rxjs';
import { filter as __filter, map as __map } from 'rxjs/operators';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { BaseService as __BaseService } from '../base-service';
import { BooleanPrimitive } from '../models/boolean-primitive';
import { ImageEntity } from '../models/image-entity';
import { ResourceUserEntity } from '../models/resource-user-entity';
import { StringPrimitive } from '../models/string-primitive';
import { UserEntity } from '../models/user-entity';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';


/**
 * User Controller
 */
@Injectable({
  providedIn: 'root',
})
class UserControllerService extends __BaseService {
  static readonly userControllerReadAvatarPath = '/user/{id}/avatar';
  static readonly userControllerAddAvatarPath = '/user/{id}/avatar';
  static readonly userControllerReadAllPath = '/users';
  static readonly userControllerCreatePath = '/users';
  static readonly userControllerApplyAsBloggerPath = '/users/blogapply';
  static readonly userControllerReadAllBloggersPath = '/users/bloggers';
  static readonly userControllerResetAllPasswordsPath = '/users/resetallpasswords';
  static readonly userControllerResetPasswordPath = '/users/resetpassword';
  static readonly userControllerReadOnePath = '/users/{id}';
  static readonly userControllerUpdatePath = '/users/{id}';
  static readonly userControllerDeletePath = '/users/{id}';
  static readonly userControllerReadActivitiesPath = '/users/{id}/activities';
  static readonly userControllerDeleteActivityPath = '/users/{id}/activities/{activityId}';
  static readonly userControllerReadBloggerPath = '/users/{id}/blogger';
  static readonly userControllerDeleteBloggerPath = '/users/{id}/blogger';
  static readonly userControllerReadBlogsPath = '/users/{id}/blogs';
  static readonly userControllerDeleteBlogPath = '/users/{id}/blogs/{blogId}';
  static readonly userControllerGrantBloggerRightPath = '/users/{id}/grantblogger';
  static readonly userControllerReadOrganisationsPath = '/users/{id}/organisations';
  static readonly userControllerAddOrganisationPath = '/users/{id}/organisations';
  static readonly userControllerDeleteOrganisationPath = '/users/{id}/organisations/{orgaId}';
  static readonly userControllerGrantSuperuserRightPath = '/users/{id}/superuser';
  static readonly userControllerGrantTranslatorRightPath = '/users/{id}/translator';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAvatar
   * @param id id
   * @return OK
   */
  userControllerReadAvatarResponse(id: string): __Observable<__StrictHttpResponse<ImageEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/user/${encodeURIComponent(String(id))}/avatar`,
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
   * readAvatar
   * @param id id
   * @return OK
   */
  userControllerReadAvatar(id: string): __Observable<ImageEntity> {
    return this.userControllerReadAvatarResponse(id).pipe(
      __map(_r => _r.body as ImageEntity)
    );
  }

  /**
   * addAvatar
   * @param id id
   * @param avatar avatar
   * @return OK
   */
  userControllerAddAvatarResponse(id: string,
    avatar?: ImageEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = avatar;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/user/${encodeURIComponent(String(id))}/avatar`,
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
   * addAvatar
   * @param id id
   * @param avatar avatar
   * @return OK
   */
  userControllerAddAvatar(id: string,
    avatar?: ImageEntity): __Observable<{}> {
    return this.userControllerAddAvatarResponse(id, avatar).pipe(
      __map(_r => _r.body as {})
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
   * @param id id
   * @return OK
   */
  userControllerReadOneResponse(id: string): __Observable<__StrictHttpResponse<ResourceUserEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}`,
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
   * @param id id
   * @return OK
   */
  userControllerReadOne(id: string): __Observable<ResourceUserEntity> {
    return this.userControllerReadOneResponse(id).pipe(
      __map(_r => _r.body as ResourceUserEntity)
    );
  }

  /**
   * update
   * @param newUser newUser
   * @param id id
   * @return OK
   */
  userControllerUpdateResponse(newUser: UserEntity,
    id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newUser;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}`,
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
   * @param id id
   * @return OK
   */
  userControllerUpdate(newUser: UserEntity,
    id: string): __Observable<{}> {
    return this.userControllerUpdateResponse(newUser, id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param id id
   * @return OK
   */
  userControllerDeleteResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}`,
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
  userControllerDelete(id: string): __Observable<{}> {
    return this.userControllerDeleteResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readActivities
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadActivitiesResponse(id: string,
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
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/activities`,
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
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadActivities(id: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.userControllerReadActivitiesResponse(id, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteActivity
   * @param id id
   * @param activityId activityId
   * @return OK
   */
  userControllerDeleteActivityResponse(id: string,
    activityId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/activities/${encodeURIComponent(String(activityId))}`,
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
   * @param id id
   * @param activityId activityId
   * @return OK
   */
  userControllerDeleteActivity(id: string,
    activityId: string): __Observable<{}> {
    return this.userControllerDeleteActivityResponse(id, activityId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readBlogger
   * @param id id
   * @return OK
   */
  userControllerReadBloggerResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/blogger`,
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
  userControllerReadBlogger(id: string): __Observable<{}> {
    return this.userControllerReadBloggerResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteBlogger
   * @param id id
   * @return OK
   */
  userControllerDeleteBloggerResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/blogger`,
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
   * @param id id
   * @return OK
   */
  userControllerDeleteBlogger(id: string): __Observable<{}> {
    return this.userControllerDeleteBloggerResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readBlogs
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadBlogsResponse(id: string,
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
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/blogs`,
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
   * @param id id
   * @param sort undefined
   * @param dir undefined
   * @param embeddings undefined
   * @return OK
   */
  userControllerReadBlogs(id: string,
    sort?: string,
    dir?: string,
    embeddings?: string): __Observable<{}> {
    return this.userControllerReadBlogsResponse(id, sort, dir, embeddings).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteBlog
   * @param id id
   * @param blogId blogId
   * @return OK
   */
  userControllerDeleteBlogResponse(id: string,
    blogId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/blogs/${encodeURIComponent(String(blogId))}`,
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
   * @param id id
   * @param blogId blogId
   * @return OK
   */
  userControllerDeleteBlog(id: string,
    blogId: string): __Observable<{}> {
    return this.userControllerDeleteBlogResponse(id, blogId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * grantBloggerRight
   * @param id id
   * @param isBlogger isBlogger
   * @return OK
   */
  userControllerGrantBloggerRightResponse(id: string,
    isBlogger: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isBlogger;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/grantblogger`,
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
   * @param id id
   * @param isBlogger isBlogger
   * @return OK
   */
  userControllerGrantBloggerRight(id: string,
    isBlogger: BooleanPrimitive): __Observable<{}> {
    return this.userControllerGrantBloggerRightResponse(id, isBlogger).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOrganisations
   * @param id id
   * @return OK
   */
  userControllerReadOrganisationsResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/organisations`,
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
   * @param id id
   * @return OK
   */
  userControllerReadOrganisations(id: string): __Observable<{}> {
    return this.userControllerReadOrganisationsResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * addOrganisation
   * @param id id
   * @param organisationParam organisationParam
   * @return OK
   */
  userControllerAddOrganisationResponse(id: string,
    organisationParam: Array<string>): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = organisationParam;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/organisations`,
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
   * @param id id
   * @param organisationParam organisationParam
   * @return OK
   */
  userControllerAddOrganisation(id: string,
    organisationParam: Array<string>): __Observable<{}> {
    return this.userControllerAddOrganisationResponse(id, organisationParam).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * deleteOrganisation
   * @param id id
   * @param orgaId orgaId
   * @return OK
   */
  userControllerDeleteOrganisationResponse(id: string,
    orgaId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/organisations/${encodeURIComponent(String(orgaId))}`,
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
   * @param id id
   * @param orgaId orgaId
   * @return OK
   */
  userControllerDeleteOrganisation(id: string,
    orgaId: string): __Observable<{}> {
    return this.userControllerDeleteOrganisationResponse(id, orgaId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * grantSuperuserRight
   * @param id id
   * @param isSuperuser isSuperuser
   * @return OK
   */
  userControllerGrantSuperuserRightResponse(id: string,
    isSuperuser: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isSuperuser;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/superuser`,
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
   * @param id id
   * @param isSuperuser isSuperuser
   * @return OK
   */
  userControllerGrantSuperuserRight(id: string,
    isSuperuser: BooleanPrimitive): __Observable<{}> {
    return this.userControllerGrantSuperuserRightResponse(id, isSuperuser).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * grantTranslatorRight
   * @param id id
   * @param isTranslator isTranslator
   * @return OK
   */
  userControllerGrantTranslatorRightResponse(id: string,
    isTranslator: BooleanPrimitive): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = isTranslator;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/users/${encodeURIComponent(String(id))}/translator`,
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
   * @param id id
   * @param isTranslator isTranslator
   * @return OK
   */
  userControllerGrantTranslatorRight(id: string,
    isTranslator: BooleanPrimitive): __Observable<{}> {
    return this.userControllerGrantTranslatorRightResponse(id, isTranslator).pipe(
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

export { UserControllerService };

