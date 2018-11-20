/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserEntity } from '../models/user-entity';
import { ResourceUserEntity } from '../models/resource-user-entity';

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
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @param dir undefined
   * @param filter undefined
   * @return OK
   */
  userControllerFindAllResponse(page?: number,
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
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @param dir undefined
   * @param filter undefined
   * @return OK
   */
  userControllerFindAll(page?: number,
    size?: number,
    sort?: string,
    dir?: string,
    filter?: string): Observable<{}> {
    return this.userControllerFindAllResponse(page, size, sort, dir, filter).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newUser newUser
   * @return OK
   */
  userControllerAddResponse(newUser: UserEntity): Observable<StrictHttpResponse<{}>> {
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
  userControllerAdd(newUser: UserEntity): Observable<{}> {
    return this.userControllerAddResponse(newUser).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param username username
   * @return OK
   */
  userControllerResetPasswordResponse(username: string): Observable<StrictHttpResponse<{}>> {
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
  userControllerResetPassword(username: string): Observable<{}> {
    return this.userControllerResetPasswordResponse(username).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param userId userId
   * @return OK
   */
  userControllerFindOneResponse(userId: string): Observable<StrictHttpResponse<ResourceUserEntity>> {
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
  userControllerFindOne(userId: string): Observable<ResourceUserEntity> {
    return this.userControllerFindOneResponse(userId).pipe(
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
   * @return OK
   */
  userControllerFindActivitiesResponse(userId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

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
   * @return OK
   */
  userControllerFindActivities(userId: string): Observable<{}> {
    return this.userControllerFindActivitiesResponse(userId).pipe(
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
  userControllerFindOrganisationsResponse(userId: string): Observable<StrictHttpResponse<{}>> {
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
  userControllerFindOrganisations(userId: string): Observable<{}> {
    return this.userControllerFindOrganisationsResponse(userId).pipe(
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
    isSuperuser: boolean): Observable<StrictHttpResponse<{}>> {
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
    isSuperuser: boolean): Observable<{}> {
    return this.userControllerGrantSuperuserRightResponse(userId, isSuperuser).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module UserControllerService {
}

export { UserControllerService }
