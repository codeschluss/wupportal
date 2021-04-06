import { Injectable } from '@angular/core';
import { bindCallback, Observable, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PlatformProvider } from '../platform/platform.provider';

@Injectable({
  providedIn: 'root'
})

export class PositionService {

  public constructor(
    private platformProvider: PlatformProvider
  ) { }

  public navigatorPosition(): Observable<GeolocationPosition> {
    const geolocation = this.platformProvider.navigator.geolocation;
    const getCurrentPosition = bindCallback((callback: PositionCallback) => {
      geolocation.getCurrentPosition(callback, null, {
        enableHighAccuracy: true,
        timeout: 10000
      });
    });

    try {
      return getCurrentPosition().pipe(mergeMap((currentPosition) => {
        return new Observable<GeolocationPosition>((observer) => {
          observer.next(currentPosition);

          const id = geolocation.watchPosition(
            (position) => observer.next(position),
            (error) => observer.error(error),
            { enableHighAccuracy: true }
          );

          return () => geolocation.clearWatch(id);
        });
      }));
    } catch (exception) {
      return throwError(exception);
    }
  }

}
