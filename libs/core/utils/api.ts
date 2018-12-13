import { HttpResponse } from '@angular/common/http';

export interface BaseService {
  rootUrl: string;
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
  dir?: string;
  filter?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export interface ReadEmbeddedParams {
  dir?: string;
  sort?: string;
}

export interface ResourceObject {
  _links?: Array<Link>;
}

export type StrictHttpResponse<T> = HttpResponse<T> & {
  readonly body: T;
};
