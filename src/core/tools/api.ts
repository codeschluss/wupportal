import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessTokenModel } from '../auth/access-token.model';
import { RefreshTokenModel } from '../auth/refresh-token.model';

export interface AuthTokens {
  access: AccessTokenModel;
  refresh: RefreshTokenModel;
}

export interface BaseService {
  rootUrl: string;
}

export interface JwtClaims {
  activityProvider: string[];
  blogger: boolean;
  blogpostAuthor: string[];
  organisationAdmin: string[];
  organisationUser: string[];
  fullname: string[];
  superUser: boolean;
  translator: boolean;
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

export interface ReadParams {
  [key: string]: any;
  dir?: string;
  embeddings?: string;
  filter?: string;
  page?: number;
  required?: boolean;
  size?: number;
  sort?: string;
}

export interface ResourceObject {
  _links?: Link[];
}

export type Response = Observable<StrictHttpResponse<any>>;

export type ResponseMethod = (...args: any) => Response;

export type StrictHttpResponse<T> = HttpResponse<T> & {
  readonly body: T;
};

export const Arr = (arg: any) => arg ? (Array.isArray(arg) ? arg : [arg]) : [];
export const Box = (value: any) => ({ value });
export const True = { value: true };
export const False = { value: false };
