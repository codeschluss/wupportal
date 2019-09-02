import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PositionService {

  public navigatorPositionResponse(): Observable<Position> {
    if (navigator.geolocation.watchPosition) {
      return new Observable((observer) => {
        const id = navigator.geolocation.watchPosition(
          (position) => observer.next(position),
          (error) => observer.error(error),
          { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(id);
      }).pipe(multicast(() => new ReplaySubject<Position>(1)), refCount());
    }

    return of(null);
  }

}
