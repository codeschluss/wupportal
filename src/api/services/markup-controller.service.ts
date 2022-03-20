/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { MarkupEntity } from '../models/markup-entity';
import { VisitableEntityObject } from '../models/visitable-entity-object';
import { ResourceMarkupEntity } from '../models/resource-markup-entity';
import { ImageEntity } from '../models/image-entity';

/**
 * Markup Controller
 */
@Injectable({
  providedIn: 'root',
})
class MarkupControllerService extends __BaseService {
  static readonly markupControllerReadAllPath = '/markups';
  static readonly markupControllerCreatePath = '/markups';
  static readonly markupControllerImportMarkupsPath = '/markups/import';
  static readonly markupControllerCalculateOverviewVisitorsPath = '/markups/visitors';
  static readonly markupControllerReadOnePath = '/markups/{id}';
  static readonly markupControllerUpdatePath = '/markups/{id}';
  static readonly markupControllerDeletePath = '/markups/{id}';
  static readonly markupControllerReadTitleImagePath = '/markups/{id}/titleimage';
  static readonly markupControllerAddTitleImagePath = '/markups/{id}/titleimage';
  static readonly markupControllerReadTranslationsPath = '/markups/{id}/translations';
  static readonly markupControllerCalculateVisitorsPath = '/markups/{id}/visitors';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `MarkupControllerService.MarkupControllerReadAllParams` containing the following parameters:
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
  markupControllerReadAllResponse(params: MarkupControllerService.MarkupControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
      this.rootUrl + `/markups`,
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
   * @param params The `MarkupControllerService.MarkupControllerReadAllParams` containing the following parameters:
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
  markupControllerReadAll(params: MarkupControllerService.MarkupControllerReadAllParams): __Observable<{}> {
    return this.markupControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newmarkup newmarkup
   * @return OK
   */
  markupControllerCreateResponse(newmarkup: MarkupEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newmarkup;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/markups`,
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
   * @param newmarkup newmarkup
   * @return OK
   */
  markupControllerCreate(newmarkup: MarkupEntity): __Observable<{}> {
    return this.markupControllerCreateResponse(newmarkup).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * importMarkups
   * @param file file
   * @return OK
   */
  markupControllerImportMarkupsResponse(file: Blob): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (file != null) { __formData.append('file', file as string | Blob);}
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/markups/import`,
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
   * importMarkups
   * @param file file
   * @return OK
   */
  markupControllerImportMarkups(file: Blob): __Observable<{}> {
    return this.markupControllerImportMarkupsResponse(file).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * calculateOverviewVisitors
   * @param id id
   * @return OK
   */
  markupControllerCalculateOverviewVisitorsResponse(id: string): __Observable<__StrictHttpResponse<Array<VisitableEntityObject>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/markups/visitors`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VisitableEntityObject>>;
      })
    );
  }
  /**
   * calculateOverviewVisitors
   * @param id id
   * @return OK
   */
  markupControllerCalculateOverviewVisitors(id: string): __Observable<Array<VisitableEntityObject>> {
    return this.markupControllerCalculateOverviewVisitorsResponse(id).pipe(
      __map(_r => _r.body as Array<VisitableEntityObject>)
    );
  }

  /**
   * readOne
   * @param id id
   * @return OK
   */
  markupControllerReadOneResponse(id: string): __Observable<__StrictHttpResponse<ResourceMarkupEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/markups/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceMarkupEntity>;
      })
    );
  }
  /**
   * readOne
   * @param id id
   * @return OK
   */
  markupControllerReadOne(id: string): __Observable<ResourceMarkupEntity> {
    return this.markupControllerReadOneResponse(id).pipe(
      __map(_r => _r.body as ResourceMarkupEntity)
    );
  }

  /**
   * update
   * @param newmarkup newmarkup
   * @param id id
   * @return OK
   */
  markupControllerUpdateResponse(newmarkup: MarkupEntity,
    id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newmarkup;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/markups/${encodeURIComponent(String(id))}`,
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
   * @param newmarkup newmarkup
   * @param id id
   * @return OK
   */
  markupControllerUpdate(newmarkup: MarkupEntity,
    id: string): __Observable<{}> {
    return this.markupControllerUpdateResponse(newmarkup, id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param id id
   * @return OK
   */
  markupControllerDeleteResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/markups/${encodeURIComponent(String(id))}`,
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
   * @param id id
   * @return OK
   */
  markupControllerDelete(id: string): __Observable<{}> {
    return this.markupControllerDeleteResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTitleImage
   * @param id id
   * @return OK
   */
  markupControllerReadTitleImageResponse(id: string): __Observable<__StrictHttpResponse<ImageEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/markups/${encodeURIComponent(String(id))}/titleimage`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImageEntity>;
      })
    );
  }
  /**
   * readTitleImage
   * @param id id
   * @return OK
   */
  markupControllerReadTitleImage(id: string): __Observable<ImageEntity> {
    return this.markupControllerReadTitleImageResponse(id).pipe(
      __map(_r => _r.body as ImageEntity)
    );
  }

  /**
   * addTitleImage
   * @param id id
   * @param avatar avatar
   * @return OK
   */
  markupControllerAddTitleImageResponse(id: string,
    avatar?: ImageEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = avatar;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/markups/${encodeURIComponent(String(id))}/titleimage`,
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
   * addTitleImage
   * @param id id
   * @param avatar avatar
   * @return OK
   */
  markupControllerAddTitleImage(id: string,
    avatar?: ImageEntity): __Observable<{}> {
    return this.markupControllerAddTitleImageResponse(id, avatar).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param id id
   * @return OK
   */
  markupControllerReadTranslationsResponse(id: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/markups/${encodeURIComponent(String(id))}/translations`,
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
   * @param id id
   * @return OK
   */
  markupControllerReadTranslations(id: string): __Observable<{}> {
    return this.markupControllerReadTranslationsResponse(id).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * calculateVisitors
   * @param id id
   * @return OK
   */
  markupControllerCalculateVisitorsResponse(id: string): __Observable<__StrictHttpResponse<Array<VisitableEntityObject>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/markups/${encodeURIComponent(String(id))}/visitors`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VisitableEntityObject>>;
      })
    );
  }
  /**
   * calculateVisitors
   * @param id id
   * @return OK
   */
  markupControllerCalculateVisitors(id: string): __Observable<Array<VisitableEntityObject>> {
    return this.markupControllerCalculateVisitorsResponse(id).pipe(
      __map(_r => _r.body as Array<VisitableEntityObject>)
    );
  }
}

module MarkupControllerService {

  /**
   * Parameters for markupControllerReadAll
   */
  export interface MarkupControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { MarkupControllerService }
