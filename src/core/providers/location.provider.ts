import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationControllerService as Service } from '../../api/services/location-controller.service';

@Injectable({
  providedIn: 'root'
})

export class LocationProvider {

  public constructor(
    private service: Service
  ) { }

  public calculateRoute(
    params: Service.LocationControllerCalculateRouteParams
  ): Observable<any> {
    return this.service.locationControllerCalculateRoute(params);
  }

}
