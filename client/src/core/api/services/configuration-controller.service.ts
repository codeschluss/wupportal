/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConfigurationEntity } from '../models/configuration-entity';
import { ResourceConfigurationEntity } from '../models/resource-configuration-entity';

/**
 * Configuration Controller
 */
@Injectable({
  providedIn: 'root',
})
class ConfigurationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param dir undefined
   * @param filter undefined
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @return OK
   */
  configurationControllerFindAllResponse(dir?: string,
    filter?: string,
    page?: number,
    size?: number,
    sort?: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (dir != null) __params = __params.set('dir', dir.toString());
    if (filter != null) __params = __params.set('filter', filter.toString());
    if (page != null) __params = __params.set('page', page.toString());
    if (size != null) __params = __params.set('size', size.toString());
    if (sort != null) __params = __params.set('sort', sort.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/configurations`,
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
   * @param dir undefined
   * @param filter undefined
   * @param page undefined
   * @param size undefined
   * @param sort undefined
   * @return OK
   */
  configurationControllerFindAll(dir?: string,
    filter?: string,
    page?: number,
    size?: number,
    sort?: string): Observable<{}> {
    return this.configurationControllerFindAllResponse(dir, filter, page, size, sort).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newConfiguration newConfiguration
   * @return OK
   */
  configurationControllerAddResponse(newConfiguration: ConfigurationEntity): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newConfiguration;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/configurations`,
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
   * @param newConfiguration newConfiguration
   * @return OK
   */
  configurationControllerAdd(newConfiguration: ConfigurationEntity): Observable<{}> {
    return this.configurationControllerAddResponse(newConfiguration).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param configurationId configurationId
   * @return OK
   */
  configurationControllerFindOneResponse(configurationId: string): Observable<StrictHttpResponse<ResourceConfigurationEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/configurations/${configurationId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceConfigurationEntity>;
      })
    );
  }
  /**
   * @param configurationId configurationId
   * @return OK
   */
  configurationControllerFindOne(configurationId: string): Observable<ResourceConfigurationEntity> {
    return this.configurationControllerFindOneResponse(configurationId).pipe(
      __map(_r => _r.body as ResourceConfigurationEntity)
    );
  }

  /**
   * @param configurationId configurationId
   * @param newConfiguration newConfiguration
   * @return OK
   */
  configurationControllerUpdateResponse(configurationId: string,
    newConfiguration: ConfigurationEntity): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = newConfiguration;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/configurations/${configurationId}`,
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
   * @param configurationId configurationId
   * @param newConfiguration newConfiguration
   * @return OK
   */
  configurationControllerUpdate(configurationId: string,
    newConfiguration: ConfigurationEntity): Observable<{}> {
    return this.configurationControllerUpdateResponse(configurationId, newConfiguration).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param configurationId configurationId
   * @return OK
   */
  configurationControllerDeleteResponse(configurationId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/configurations/${configurationId}`,
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
   * @param configurationId configurationId
   * @return OK
   */
  configurationControllerDelete(configurationId: string): Observable<{}> {
    return this.configurationControllerDeleteResponse(configurationId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module ConfigurationControllerService {
}

export { ConfigurationControllerService }
