import { Injectable } from '@angular/core';
import { DeviceProvider } from '@wooportal/app';
import { Observable, of, ReplaySubject } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PositionService {

  public constructor(
    private deviceProvider: DeviceProvider
  ) { }

  public frontendPositionResponse(): Observable<Position> {
    if (this.deviceProvider.frontend.geolocation.watchPosition) {
      return new Observable<Position>((observer) => {
        const id = this.deviceProvider.frontend.geolocation.watchPosition(
          (position) => observer.next(position),
          (error) => observer.error(error),
          { enableHighAccuracy: true }
        );

        return () => {
          this.deviceProvider.frontend.geolocation.clearWatch(id);
          observer.complete();
        };
      }).pipe(multicast(() => new ReplaySubject<Position>(1)), refCount());
    }

    return of(null);
  }

}
