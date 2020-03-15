import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@wooportal/app';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../tools/api';
import { RefreshTokenModel } from './refresh-token.model';

@Injectable({ providedIn: 'root' })
export class TokenService {

  public constructor(
    private app: ApplicationSettings,
    private httpClient: HttpClient,
  ) { }

  public apiLogin(username: string, password: string): Observable<any> {
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

  public apiRefresh(token?: RefreshTokenModel): Observable<any> {
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

  private call(request: HttpRequest<any>): Observable<any> {
    return this.httpClient.request<any>(request).pipe(
      filter((response) => response instanceof HttpResponse),
      map((response: StrictHttpResponse<any>) => response.body)
    );
  }

}
