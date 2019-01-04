import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessTokenModel } from '../auth/access-token.model';
import { RefreshTokenModel } from '../auth/refresh-token.model';
import { CoreSettings } from './settings';

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {

  public constructor(
    private coreSettings: CoreSettings
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(request.url.startsWith(this.coreSettings.apiUrl)
      ? request.clone({ setHeaders: { 'Content-Type': 'application/json' } })
      : request);
  }

}

export interface AuthTokens {
  access: AccessTokenModel;
  refresh: RefreshTokenModel;
}

export interface BaseService {
  rootUrl: string;
}

export interface JwtClaims {
  activityProvider: string[];
  organisationAdmin: string[];
  organisationUser: string[];
  superUser: boolean;
  userId: string;
}

export interface Link {
  deprecation?: string;
  href?: string;
  hreflang?: string;
  media?: string;
  rel?: string;
  templated?: boolean;
  title?: string;
  type?: string;
}

export interface ReadAllParams {
  [key: string]: any;
  dir?: string;
  filter?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export interface ReadEmbeddedParams {
  [key: string]: any;
  dir?: string;
  sort?: string;
}

export interface ResourceObject {
  _links?: Array<Link>;
}

export type StrictHttpResponse<T> = HttpResponse<T> & {
  readonly body: T;
};
