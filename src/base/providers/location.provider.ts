import { Injectable } from '@angular/core';
import { Response } from '@wooportal/core';
import { LocationControllerService } from '../../api/services/location-controller.service';

@Injectable({ providedIn: 'root' })
export class LocationProvider {

  public constructor(
    private service: LocationControllerService
  ) { }

  public calculateRoute(
    params: LocationControllerService.LocationControllerCalculateRouteParams
  ): Response {
    return this.service.locationControllerCalculateRouteResponse(params);
  }

}
