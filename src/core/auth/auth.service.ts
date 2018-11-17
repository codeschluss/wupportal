import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api/api-configuration';
import { BaseService } from '../api/base-service';
import { StrictHttpResponse } from '../api/strict-http-response';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {

  public constructor(
    apiConfiguration: ApiConfiguration,
    httpClient: HttpClient
  ) {
    super(apiConfiguration, httpClient);
  }

  public authLoginResponse(username: string, password: string):
    Observable<StrictHttpResponse<object>> {

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

    return this.http.request<any>(request).pipe(
      filter((response) => response instanceof HttpResponse),
      map((response) => response as StrictHttpResponse<object>)
    );
  }

}
