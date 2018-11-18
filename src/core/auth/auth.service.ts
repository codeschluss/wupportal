import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONValidator } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ApiConfiguration } from '../api/api-configuration';
import { BaseService } from '../api/base-service';
import { StrictHttpResponse } from '../api/strict-http-response';
import { ErrorModel } from '../base/error.model';
import { TokenModel, TokenModelSchema } from './token.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {

  public constructor(
    apiConfiguration: ApiConfiguration,
    httpClient: HttpClient,
    private jsonValidator: JSONValidator
  ) {
    super(apiConfiguration, httpClient);
  }

  public authLoginResponse(username: string, password: string):
    Observable<StrictHttpResponse<TokenModel>> {

    const request = new HttpRequest<any>(
      'POST',
      this.rootUrl + '/login',
      {
        username: username,
        password: password
      },
      {
        headers: new HttpHeaders(),
        params: this.newParams(),
        responseType: 'json'
      }
    );

    return this.call(request);
  }

  public authRefreshResponse(token: TokenModel):
    Observable<StrictHttpResponse<TokenModel>> {

    const request = new HttpRequest<any>(
      'POST',
      this.rootUrl + '/refresh',
      token,
      {
        headers: new HttpHeaders(),
        params: this.newParams(),
        responseType: 'json'
      }
    );

    return this.call(request);
  }

  private call(request: HttpRequest<any>):
    Observable<StrictHttpResponse<TokenModel>> {

    return this.http.request<any>(request).pipe(
      filter((response) => response instanceof HttpResponse),
      map((response) => response as StrictHttpResponse<object>),
      map((response) => this.decode(response)),
      tap((response) => this.validate(response.body))
    );
  }

  private decode(response: StrictHttpResponse<object>):
    StrictHttpResponse<TokenModel> {

    const bearer = response.headers.get('authorization').split(' ')[1];
    const token = JSON.parse(atob(bearer.split('.')[1]));
    return response.clone<TokenModel>({ body: token, statusText: bearer });
  }

  private validate(token: TokenModel): void {
    if (!this.jsonValidator.validate(token, TokenModelSchema)) {
      throw Object.assign(new ErrorModel, {
        timestamp: new Date().toISOString(),
        status: 401,
        error: 'JSON Web Token invalid',
        message: 'JSON Web Token did not pass JSON schema validation',
        path: '/api/login'
      });
    }
  }

}
