import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationControllerService } from '../../api/services/location-controller.service';

@Injectable({ providedIn: 'root' })
export class LocationProvider {

  public constructor(
    private service: LocationControllerService
  ) { }

  public calculateRoute(
    params: LocationControllerService.LocationControllerCalculateRouteParams
  ): Observable<any> {
    return this.service.locationControllerCalculateRoute(params);
  }

}
