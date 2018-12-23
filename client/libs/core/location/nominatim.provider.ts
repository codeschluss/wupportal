import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NominatimService } from './nominatim.service';

export interface NominatimResponse {
  houseNumber: string;
  latitude: number;
  longitude: number;
  place: string;
  postalCode: string;
  street: string;
}

@Injectable({ providedIn: 'root' })
export class NominatimProvider {

  public constructor(
    private nominatimService: NominatimService
  ) { }

  public search(query: string): Observable<NominatimResponse[]> {
    return this.nominatimService.nominatimSearchResponse(query).pipe(
      map((response) => response.body.map((place) => ({
        houseNumber: place.address.house_number,
        latitude: place.lat,
        longitude: place.lon,
        place: place.address.city
          || place.address.county,
        postalCode: place.address.postcode,
        street: place.address.road
          || place.address.construction
          || place.address.pedestrian
      })))
    );
  }

}
