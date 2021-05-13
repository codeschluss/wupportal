/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CategoryEntity } from '../models/category-entity';
import { ResourceCategoryEntity } from '../models/resource-category-entity';

/**
 * Category Controller
 */
@Injectable({
  providedIn: 'root',
})
class CategoryControllerService extends __BaseService {
  static readonly categoryControllerReadAllPath = '/categories';
  static readonly categoryControllerCreatePath = '/categories';
  static readonly categoryControllerReadOnePath = '/categories/{categoryId}';
  static readonly categoryControllerUpdatePath = '/categories/{categoryId}';
  static readonly categoryControllerDeletePath = '/categories/{categoryId}';
  static readonly categoryControllerReadTranslationsPath = '/categories/{categoryId}/translations';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
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
  categoryControllerReadAllResponse(params: CategoryControllerService.CategoryControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readAll
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
  categoryControllerReadAll(params: CategoryControllerService.CategoryControllerReadAllParams): __Observable<{}> {
    return this.categoryControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newCategory newCategory
   * @return OK
   */
  categoryControllerCreateResponse(newCategory: CategoryEntity): __Observable<__StrictHttpResponse<{}>> {
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
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * create
   * @param newCategory newCategory
   * @return OK
   */
  categoryControllerCreate(newCategory: CategoryEntity): __Observable<{}> {
    return this.categoryControllerCreateResponse(newCategory).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerReadOneResponse(categoryId: string): __Observable<__StrictHttpResponse<ResourceCategoryEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/categories/${encodeURIComponent(String(categoryId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceCategoryEntity>;
      })
    );
  }
  /**
   * readOne
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerReadOne(categoryId: string): __Observable<ResourceCategoryEntity> {
    return this.categoryControllerReadOneResponse(categoryId).pipe(
      __map(_r => _r.body as ResourceCategoryEntity)
    );
  }

  /**
   * update
   * @param newCategory newCategory
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerUpdateResponse(newCategory: CategoryEntity,
    categoryId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newCategory;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/categories/${encodeURIComponent(String(categoryId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * update
   * @param newCategory newCategory
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerUpdate(newCategory: CategoryEntity,
    categoryId: string): __Observable<{}> {
    return this.categoryControllerUpdateResponse(newCategory, categoryId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerDeleteResponse(categoryId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/categories/${encodeURIComponent(String(categoryId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * delete
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerDelete(categoryId: string): __Observable<{}> {
    return this.categoryControllerDeleteResponse(categoryId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerReadTranslationsResponse(categoryId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/categories/${encodeURIComponent(String(categoryId))}/translations`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * readTranslations
   * @param categoryId categoryId
   * @return OK
   */
  categoryControllerReadTranslations(categoryId: string): __Observable<{}> {
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
