/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Location Controller
 */
@Injectable({
  providedIn: 'root',
})
class LocationControllerService extends __BaseService {
  static readonly locationControllerCalculateRoutePath = '/locations';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * calculateRoute
   * @param params The `LocationControllerService.LocationControllerCalculateRouteParams` containing the following parameters:
   *
   * - `startPoint.latitude`:
   *
   * - `startPoint.longitude`:
   *
   * - `targetPoint.latitude`:
   *
   * - `targetPoint.longitude`:
   *
   * - `via[0].latitude`:
   *
   * - `via[0].longitude`:
   *
   * - `travelMode`:
   *
   * @return OK
   */
  locationControllerCalculateRouteResponse(params: LocationControllerService.LocationControllerCalculateRouteParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.startPointLatitude != null) __params = __params.set('startPoint.latitude', params.startPointLatitude.toString());
    if (params.startPointLongitude != null) __params = __params.set('startPoint.longitude', params.startPointLongitude.toString());
    if (params.targetPointLatitude != null) __params = __params.set('targetPoint.latitude', params.targetPointLatitude.toString());
    if (params.targetPointLongitude != null) __params = __params.set('targetPoint.longitude', params.targetPointLongitude.toString());
    if (params.via0Latitude != null) __params = __params.set('via[0].latitude', params.via0Latitude.toString());
    if (params.via0Longitude != null) __params = __params.set('via[0].longitude', params.via0Longitude.toString());
    if (params.travelMode != null) __params = __params.set('travelMode', params.travelMode.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/locations`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * calculateRoute
   * @param params The `LocationControllerService.LocationControllerCalculateRouteParams` containing the following parameters:
   *
   * - `startPoint.latitude`:
   *
   * - `startPoint.longitude`:
   *
   * - `targetPoint.latitude`:
   *
   * - `targetPoint.longitude`:
   *
   * - `via[0].latitude`:
   *
   * - `via[0].longitude`:
   *
   * - `travelMode`:
   *
   * @return OK
   */
  locationControllerCalculateRoute(params: LocationControllerService.LocationControllerCalculateRouteParams): __Observable<{}> {
    return this.locationControllerCalculateRouteResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module LocationControllerService {

  /**
   * Parameters for locationControllerCalculateRoute
   */
  export interface LocationControllerCalculateRouteParams {
    startPointLatitude?: number;
    startPointLongitude?: number;
    targetPointLatitude?: number;
    targetPointLongitude?: number;
    via0Latitude?: number;
    via0Longitude?: number;
    travelMode?: 'DRIVING' | 'WALKING' | 'TRANSIT';
  }
}

export { LocationControllerService }
