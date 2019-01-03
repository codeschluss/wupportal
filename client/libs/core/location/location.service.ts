import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../utils/api';
import { CoreSettings } from '../utils/settings';

export interface NominatimResponse {
  address: {
    city?: string;
    construction?: string;
    house_number?: string;
    postcode?: string;
    pedestrian?: string;
    road?: string;
    state?: string;
    town?: string;
  };
  lat: number;
  lon: number;
}

@Injectable({ providedIn: 'root' })
export class LocationService {

  public constructor(
    private coreSettings: CoreSettings,
    private httpClient: HttpClient,
  ) { }

  public nominatimSearchResponse(query: string):
    Observable<StrictHttpResponse<NominatimResponse[]>> {

    const endpoint = this.coreSettings.nominatimEndpoint;
    const params = this.coreSettings.nominatimParams;

    return this.httpClient.request<any>(new HttpRequest<NominatimResponse[]>(
      'GET',
      `${endpoint}/${query}?${params}`,
      null,
      {
        responseType: 'json'
      }
    )).pipe(
      filter((response) => response instanceof HttpResponse),
      map((response) => response as StrictHttpResponse<NominatimResponse[]>));
  }

}
