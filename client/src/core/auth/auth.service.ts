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
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  public authEndpointLoginResponse(username: string, password: string):
    Observable<StrictHttpResponse<object>> {

    const params = this.newParams();
    const headers = new HttpHeaders();
    const body = {
      username: username,
      password: password
    };

    const req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/login`,
      body,
      {
        headers: headers,
        params: params,
        responseType: 'json'
      }
    );

    return this.http.request<any>(req).pipe(
      filter((res) => res instanceof HttpResponse),
      map((res) => res as StrictHttpResponse<object>)
    );
  }

  public logout(): void {

  }

}
