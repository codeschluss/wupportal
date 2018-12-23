import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PositionService {

  public navigatorPositionResponse(): Observable<Position> {
    const locator = navigator.geolocation;

    if (locator) {
      return from(new Promise((resolve, reject) => locator.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 0
        }
      )));
    } else {
      return of(null);
    }
  }

}
