import { HttpResponse } from '@angular/common/http';
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

export const Box = (value: boolean | number | string) => ({ value: value });
export const True = { value: true };
export const False = { value: false };
