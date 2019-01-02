import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../utils/api';
import { CoreSettings } from '../utils/settings';

@Injectable({ providedIn: 'root' })
export class LocationService {

  public constructor(
    private coreSettings: CoreSettings,
    private httpClient: HttpClient,
  ) { }

  public nominatimSearchResponse(query: string):
    Observable<StrictHttpResponse<any>> {

    const endpoint = this.coreSettings.nominatimEndpoint;
    const params = this.coreSettings.nominatimParams;

    return this.httpClient.request<any>(new HttpRequest<any>(
      'GET',
      `${endpoint}/${query}?${params}`,
      null,
      {
        responseType: 'json'
      }
    )).pipe(
      filter((response) => response instanceof HttpResponse),
      map((response) => response as StrictHttpResponse<any>));
  }

}
