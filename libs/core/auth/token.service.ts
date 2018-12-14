import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JSONValidator } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ErrorModel } from '../error/error.model';
import { StrictHttpResponse } from '../utils/api';
import { CoreSettings } from '../utils/settings';
import { AccessTokenModel } from './access-token.model';
import { RefreshTokenModel } from './refresh-token.model';

@Injectable({ providedIn: 'root' })
export class TokenService {

  public constructor(
    private coreSettings: CoreSettings,
    private httpClient: HttpClient,
    private jsonValidator: JSONValidator
  ) { }

  public apiLoginResponse(username: string, password: string):
    Observable<StrictHttpResponse<any>> {

    return this.call(new HttpRequest<any>(
      'POST',
      this.coreSettings.authUrl,
      {
        username: username,
        password: password
      },
      {
        headers: new HttpHeaders(),
        responseType: 'json'
      }
    ));
  }

  public apiRefreshResponse(): Observable<StrictHttpResponse<any>> {
    return this.call(new HttpRequest<any>(
      'GET',
      this.coreSettings.refreshUrl,
      null,
      {
        headers: new HttpHeaders(),
        responseType: 'json'
      }
    ));
  }

  private call(request: HttpRequest<any>):
    Observable<StrictHttpResponse<any>> {

    return this.httpClient.request<any>(request).pipe(
      filter((response) => response instanceof HttpResponse),
      map((response) => response as StrictHttpResponse<any>),
      map((response) => this.tokenize(response)),
      tap((response) => this.validate(response))
    );
  }

  private tokenize(response: StrictHttpResponse<any>):
    StrictHttpResponse<any> {

    Object.keys(response.body).forEach((type) => {
      const token = JSON.parse(atob(response.body[type].split('.')[1]));
      let item; switch (type) {
        case 'access': item = new AccessTokenModel(); break;
        case 'refresh': item = new RefreshTokenModel(); break;
      }

      token.exp = token.exp - 5;
      token.raw = response.body[type];
      response.body[type] = Object.assign(item, token);
    });

    return response.clone<object>({ body: response.body });
  }

  private validate(response: StrictHttpResponse<any>): void {
    Object.values(response.body).forEach((token: any) => {
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
