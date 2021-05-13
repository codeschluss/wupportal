import { Injectable } from '@angular/core';
import { NEVER, Observable, race } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { PlatformProvider } from '../platform/platform.provider';

@Injectable({
  providedIn: 'root'
})

export class PositionService {

  public constructor(
    private platformProvider: PlatformProvider
  ) { }

  public navigatorPosition(): Observable<GeolocationPosition> {
    return race(
      NEVER.pipe(timeout(10000)),
      new Observable<GeolocationPosition>((observer) => {
        const id = this.platformProvider.navigator.geolocation.watchPosition(
          (position) => observer.next(position),
          (error) => observer.error(error),
          { enableHighAccuracy: true }
        );

        return () => this.platformProvider.navigator.geolocation.clearWatch(id);
      })
    );
  }

}
