import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StrictHttpResponse } from '../utils/api';
import { LocationService, NominatimResponse } from './location.service';

export interface LocationResponse {
  houseNumber: string;
  latitude: number;
  longitude: number;
  place: string;
  postalCode: string;
  street: string;
}

@Injectable({ providedIn: 'root' })
export class LocationProvider {

  public constructor(
    private locationService: LocationService
  ) { }

  public locate(query: string): Observable<LocationResponse[]> {
    return forkJoin([
      this.locationService.nominatimSearchResponse(query)
        .pipe(map((response) => this.normalizeNominatim(response)))
    ]).pipe(map((items) => items.flat()));
  }

  private normalizeNominatim(response: StrictHttpResponse<NominatimResponse[]>):
    LocationResponse[] {

    return response.body.map((item) => ({
      houseNumber: item.address.house_number,
      latitude: item.lat,
      longitude: item.lon,
      place: item.address.town
        || item.address.city
        || item.address.state,
      postalCode: item.address.postcode,
      street: item.address.pedestrian
        || item.address.construction
        || item.address.road
    }));
  }

}
