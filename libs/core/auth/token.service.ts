import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@wooportal/app';
import { filter, map } from 'rxjs/operators';
import { Response, StrictHttpResponse } from '../tools/api';
import { RefreshTokenModel } from './refresh-token.model';

@Injectable({ providedIn: 'root' })
export class TokenService {

  public constructor(
    private app: ApplicationSettings,
    private httpClient: HttpClient,
  ) { }

  public apiLoginResponse(username: string, password: string): Response {
    return this.call(new HttpRequest<any>(
      'POST',
      this.app.config.api.authUrl,
      {
        username,
        password
      },
      {
        headers: new HttpHeaders(),
        responseType: 'json'
      }
    ));
  }

  public apiRefreshResponse(token?: RefreshTokenModel): Response {
    const header = token ? { authorization: `Bearer ${token.raw}` } : { };
    return this.call(new HttpRequest<any>(
      'GET',
      this.app.config.api.refreshUrl,
      null,
      {
        headers: new HttpHeaders(header),
        responseType: 'json'
      }
    ));
  }

  private call(request: HttpRequest<any>): Response {
    return this.httpClient.request<any>(request).pipe(
      filter((response) => response instanceof HttpResponse),
      map((response) => response as StrictHttpResponse<any>));
  }

}
