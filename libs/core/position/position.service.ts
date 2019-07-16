import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PositionService {

  public navigatorPositionResponse(): Observable<Position> {
    if (navigator.geolocation.watchPosition) {
      return new Observable((watch) => {
        const id = navigator.geolocation.watchPosition(
          (position) => watch.next(position),
          (error) => watch.error(error),
          { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(id);
      });
    }

    return of(null);
  }

}
