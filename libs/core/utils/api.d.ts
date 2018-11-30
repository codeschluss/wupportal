import { HttpResponse } from '@angular/common/http';

export interface BaseService {
  rootUrl: string;
}

export type StrictHttpResponse<T> = HttpResponse<T> & {
  readonly body: T;
};
