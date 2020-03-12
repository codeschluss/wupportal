import { Injectable } from '@angular/core';
import { DeviceProvider } from '@wooportal/app';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PositionService {

  public constructor(
    private deviceProvider: DeviceProvider
  ) { }

  public frontendPosition(): Observable<Position> {
    try {
      return new Observable<Position>((observer) => {
        const id = this.deviceProvider.frontend.geolocation.watchPosition(
          (position) => observer.next(position),
          (error) => observer.error(error),
          { enableHighAccuracy: true }
        );

        return () => this.deviceProvider.frontend.geolocation.clearWatch(id);
      });
    } catch (error) {
      return throwError(error);
    }
  }

}
