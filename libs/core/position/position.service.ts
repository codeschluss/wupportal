import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PositionService {

  public navigatorPositionResponse(): Observable<Position> {
    const locator = navigator.geolocation.getCurrentPosition;

    if (locator) {
      return from(new Promise<Position>((resolve, reject) => locator(
        (position) => resolve(position),
        (error) => reject(error),
        { enableHighAccuracy: true }
      )));
    }

    return of(null);
  }

}
