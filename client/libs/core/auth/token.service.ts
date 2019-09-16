import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../utils/api';
import { CoreSettings } from '../utils/settings';
import { RefreshTokenModel } from './refresh-token.model';

@Injectable({ providedIn: 'root' })
export class TokenService {

  public constructor(
    private coreSettings: CoreSettings,
    private httpClient: HttpClient,
  ) { }

  public apiLoginResponse(username: string, password: string):
    Observable<StrictHttpResponse<any>> {

    return this.call(new HttpRequest<any>(
      'POST',
      this.coreSettings.apiAuthUrl,
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

  public apiRefreshResponse(token?: RefreshTokenModel):
    Observable<StrictHttpResponse<any>> {

    const header = token ? { 'Authorization': `Bearer ${token.raw}` } : { };
    return this.call(new HttpRequest<any>(
      'GET',
      this.coreSettings.apiRefreshUrl,
      null,
      {
        headers: new HttpHeaders(header),
        responseType: 'json'
      }
    ));
  }

  private call(request: HttpRequest<any>):
    Observable<StrictHttpResponse<any>> {

    return this.httpClient.request<any>(request).pipe(
      filter((response) => response instanceof HttpResponse),
      map((response) => response as StrictHttpResponse<any>));
  }

}
