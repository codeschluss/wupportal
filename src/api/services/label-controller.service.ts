/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { LabelEntity } from '../models/label-entity';
import { ResourceLabelEntity } from '../models/resource-label-entity';

/**
 * Label Controller
 */
@Injectable({
  providedIn: 'root',
})
class LabelControllerService extends __BaseService {
  static readonly labelControllerReadAllPath = '/labels';
  static readonly labelControllerCreatePath = '/labels';
  static readonly labelControllerImportLabelsPath = '/labels/import';
  static readonly labelControllerReadOnePath = '/labels/{labelId}';
  static readonly labelControllerUpdatePath = '/labels/{labelId}';
  static readonly labelControllerDeletePath = '/labels/{labelId}';
  static readonly labelControllerReadTranslationsPath = '/labels/{labelId}/translations';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * readAll
   * @param params The `LabelControllerService.LabelControllerReadAllParams` containing the following parameters:
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
  labelControllerReadAllResponse(params: LabelControllerService.LabelControllerReadAllParams): __Observable<__StrictHttpResponse<{}>> {
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
      this.rootUrl + `/labels`,
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
   * @param params The `LabelControllerService.LabelControllerReadAllParams` containing the following parameters:
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
  labelControllerReadAll(params: LabelControllerService.LabelControllerReadAllParams): __Observable<{}> {
    return this.labelControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * create
   * @param newlabel newlabel
   * @return OK
   */
  labelControllerCreateResponse(newlabel: LabelEntity): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newlabel;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/labels`,
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
   * @param newlabel newlabel
   * @return OK
   */
  labelControllerCreate(newlabel: LabelEntity): __Observable<{}> {
    return this.labelControllerCreateResponse(newlabel).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * importLabels
   * @param file file
   * @return OK
   */
  labelControllerImportLabelsResponse(file: Blob): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (file != null) { __formData.append('file', file as string | Blob);}
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/labels/import`,
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
   * importLabels
   * @param file file
   * @return OK
   */
  labelControllerImportLabels(file: Blob): __Observable<{}> {
    return this.labelControllerImportLabelsResponse(file).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readOne
   * @param labelId labelId
   * @return OK
   */
  labelControllerReadOneResponse(labelId: string): __Observable<__StrictHttpResponse<ResourceLabelEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/labels/${encodeURIComponent(String(labelId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResourceLabelEntity>;
      })
    );
  }
  /**
   * readOne
   * @param labelId labelId
   * @return OK
   */
  labelControllerReadOne(labelId: string): __Observable<ResourceLabelEntity> {
    return this.labelControllerReadOneResponse(labelId).pipe(
      __map(_r => _r.body as ResourceLabelEntity)
    );
  }

  /**
   * update
   * @param newlabel newlabel
   * @param labelId labelId
   * @return OK
   */
  labelControllerUpdateResponse(newlabel: LabelEntity,
    labelId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newlabel;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/labels/${encodeURIComponent(String(labelId))}`,
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
   * @param newlabel newlabel
   * @param labelId labelId
   * @return OK
   */
  labelControllerUpdate(newlabel: LabelEntity,
    labelId: string): __Observable<{}> {
    return this.labelControllerUpdateResponse(newlabel, labelId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * delete
   * @param labelId labelId
   * @return OK
   */
  labelControllerDeleteResponse(labelId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/labels/${encodeURIComponent(String(labelId))}`,
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
   * @param labelId labelId
   * @return OK
   */
  labelControllerDelete(labelId: string): __Observable<{}> {
    return this.labelControllerDeleteResponse(labelId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * readTranslations
   * @param labelId labelId
   * @return OK
   */
  labelControllerReadTranslationsResponse(labelId: string): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/labels/${encodeURIComponent(String(labelId))}/translations`,
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
   * @param labelId labelId
   * @return OK
   */
  labelControllerReadTranslations(labelId: string): __Observable<{}> {
    return this.labelControllerReadTranslationsResponse(labelId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module LabelControllerService {

  /**
   * Parameters for labelControllerReadAll
   */
  export interface LabelControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { LabelControllerService }
