import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONValidator } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ApiConfiguration } from '../api/api-configuration';
import { BaseService } from '../api/base-service';
import { StrictHttpResponse } from '../api/strict-http-response';
import { ErrorModel } from '../error/error.model';
import { ClientPackage } from '../utils/package';
import { AccessTokenModel } from './access-token.model';
import { RefreshTokenModel } from './refresh-token.model';

@Injectable({ providedIn: 'root' })
export class TokenService extends BaseService {

  public constructor(
    private clientPackage: ClientPackage,
    private jsonValidator: JSONValidator,

    apiConfiguration: ApiConfiguration,
    httpClient: HttpClient
  ) {
    super(apiConfiguration, httpClient);
  }

  public apiLoginResponse(username: string, password: string):
    Observable<StrictHttpResponse<object>> {

    return this.call(new HttpRequest<any>(
      'POST',
      this.clientPackage.config.api.authUrl,
      {
        username: username,
        password: password
      },
      {
        headers: new HttpHeaders(),
        params: this.newParams(),
        responseType: 'json'
      }
    ));
  }

  public apiRefreshResponse(): Observable<StrictHttpResponse<object>> {
    return this.call(new HttpRequest<any>(
      'GET',
      this.clientPackage.config.api.refreshUrl,
      null,
      {
        headers: new HttpHeaders(),
        params: this.newParams(),
        responseType: 'json'
      }
    ));
  }

  private call(request: HttpRequest<any>):
    Observable<StrictHttpResponse<object>> {

    return this.http.request<any>(request).pipe(
      filter((response) => response instanceof HttpResponse),
      map((response) => response as StrictHttpResponse<object>),
      map((response) => this.tokenize(response)),
      tap((response) => this.validate(response))
    );
  }

  private tokenize(response: StrictHttpResponse<object>):
    StrictHttpResponse<object> {

    Object.keys(response.body).forEach((type) => {
      const token = JSON.parse(atob(response.body[type].split('.')[1]));
      let model; switch (type) {
        case 'access': model = new AccessTokenModel(); break;
        case 'refresh': model = new RefreshTokenModel(); break;
      }

      token.exp = token.exp - 5;
      token.raw = response.body[type];
      response.body[type] = Object.assign(model, token);
    });

    return response.clone<object>({ body: response.body });
  }

  private validate(response: StrictHttpResponse<object>): void {
    Object.values(response.body).forEach((token) => {
      if (!this.jsonValidator.validate(token, token.constructor.schema)) {
        throw Object.assign(new ErrorModel(), {
          status: 412,
          error: token.constructor.name,
          message: 'JSON Web Token did not pass JSON schema validation',
          path: response.url
        });
      }
    });
  }

}
