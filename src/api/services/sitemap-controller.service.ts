/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Sitemap } from '../models/sitemap';

/**
 * Sitemap Controller
 */
@Injectable({
  providedIn: 'root',
})
class SitemapControllerService extends __BaseService {
  static readonly sitemapControllerGetSitemapPath = '/sitemap';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getSitemap
   * @return OK
   */
  sitemapControllerGetSitemapResponse(): __Observable<__StrictHttpResponse<Sitemap>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/sitemap`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Sitemap>;
      })
    );
  }
  /**
   * getSitemap
   * @return OK
   */
  sitemapControllerGetSitemap(): __Observable<Sitemap> {
    return this.sitemapControllerGetSitemapResponse().pipe(
      __map(_r => _r.body as Sitemap)
    );
  }
}

module SitemapControllerService {
}

export { SitemapControllerService }
