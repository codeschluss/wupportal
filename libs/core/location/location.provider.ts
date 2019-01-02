import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { forkJoin, Observable, of } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { StrictHttpResponse } from '../utils/api';
import { LocationDialogComponent } from './location.dialog';
import { LocationService } from './location.service';

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
    private dialog: MatDialog,
    private locationService: LocationService
  ) { }

  public lookup(query: string): Observable<LocationResponse> {
    return forkJoin([
      of([] as LocationResponse[]),
      this.locationService.nominatimSearchResponse(query)
        .pipe(map((response) => this.normalizeNominatim(response)))
    ]).pipe(mergeMap((items) => this.select(items.flat())));
  }

  private normalizeNominatim(response: StrictHttpResponse<any>):
    LocationResponse[] {

    return response.body.map((item) => ({
      houseNumber: item.address.house_number,
      latitude: item.lat,
      longitude: item.lon,
      place: item.address.city
        || item.address.county
        || item.address.state,
      postalCode: item.address.postcode,
      street: item.address.road
        || item.address.construction
        || item.address.pedestrian
    }));
  }

  private select(items: LocationResponse[]): Observable<any> {
    return this.dialog.open(LocationDialogComponent, { data: items })
      .afterClosed().pipe(filter(Boolean));
  }

}
