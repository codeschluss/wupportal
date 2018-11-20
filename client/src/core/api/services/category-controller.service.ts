/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CategoryEntity } from '../models/category-entity';
import { ResourceCategoryEntity } from '../models/resource-category-entity';

/**
 * Category Controller
 */
@Injectable({
  providedIn: 'root',
})
class CategoryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @param dir undefined
   * @param filter undefined
   * @return OK
   */
  categoryControllerFindAllResponse(page?: number,
    size?: number,
    sort?: string,
    dir?: string,
    filter?: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set('page', page.toString());
    if (size != null) __params = __params.set('size', size.toString());
    if (sort != null) __params = __params.set('sort', sort.toString());
    if (dir != null) __params = __params.set('dir', dir.toString());
    if (filter != null) __params = __params.set('filter', filter.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @param dir undefined
   * @param filter undefined
   * @return OK
   */
  categoryControllerFindAll(page?: number,
    size?: number,
    sort?: string,
    dir?: string,
    filter?: string): Observable<{}> {
    return this.categoryControllerFindAllResponse(page, size, sort, dir, filter).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newCategory newCategory
   * @return OK
   */
  categoryControllerAddResponse(newCategory: CategoryEntity): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newCategory;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newCategory newCategory
   * @return OK
   */
  categoryControllerAdd(newCategory: CategoryEntity): Observable<{}> {
    return this.categoryControllerAddResponse(newCategory).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerFindOneResponse(categoryId: string): Observable<StrictHttpResponse<ResourceCategoryEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/categories/${categoryId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceCategoryEntity>;
      })
    );
  }
  /**
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerFindOne(categoryId: string): Observable<ResourceCategoryEntity> {
    return this.categoryControllerFindOneResponse(categoryId).pipe(
      __map(_r => _r.body as ResourceCategoryEntity)
    );
  }

  /**
   * @param newCategory newCategory
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerUpdateResponse(newCategory: CategoryEntity,
    categoryId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newCategory;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/categories/${categoryId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newCategory newCategory
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerUpdate(newCategory: CategoryEntity,
    categoryId: string): Observable<{}> {
    return this.categoryControllerUpdateResponse(newCategory, categoryId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerDeleteResponse(categoryId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/categories/${categoryId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerDelete(categoryId: string): Observable<{}> {
    return this.categoryControllerDeleteResponse(categoryId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module CategoryControllerService {
}

export { CategoryControllerService }
