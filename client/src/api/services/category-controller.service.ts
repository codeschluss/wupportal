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
   * @param params The `CategoryControllerService.CategoryControllerReadAllParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `embeddings`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * @return OK
   */
  categoryControllerReadAllResponse(params: CategoryControllerService.CategoryControllerReadAllParams): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
    if (params.embeddings != null) __params = __params.set('embeddings', params.embeddings.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.filter != null) __params = __params.set('filter', params.filter.toString());
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
   * @param params The `CategoryControllerService.CategoryControllerReadAllParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `embeddings`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * @return OK
   */
  categoryControllerReadAll(params: CategoryControllerService.CategoryControllerReadAllParams): Observable<{}> {
    return this.categoryControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newCategory newCategory
   * @return OK
   */
  categoryControllerCreateResponse(newCategory: CategoryEntity): Observable<StrictHttpResponse<{}>> {
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
  categoryControllerCreate(newCategory: CategoryEntity): Observable<{}> {
    return this.categoryControllerCreateResponse(newCategory).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerReadOneResponse(categoryId: string): Observable<StrictHttpResponse<ResourceCategoryEntity>> {
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
  categoryControllerReadOne(categoryId: string): Observable<ResourceCategoryEntity> {
    return this.categoryControllerReadOneResponse(categoryId).pipe(
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

  /**
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerReadTranslationsResponse(categoryId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/categories/${categoryId}/translations`,
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
  categoryControllerReadTranslations(categoryId: string): Observable<{}> {
    return this.categoryControllerReadTranslationsResponse(categoryId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module CategoryControllerService {

  /**
   * Parameters for categoryControllerReadAll
   */
  export interface CategoryControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { CategoryControllerService }
