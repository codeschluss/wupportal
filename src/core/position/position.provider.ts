import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { map, multicast, refCount } from 'rxjs/operators';
import { PositionService } from './position.service';

@Injectable({
  providedIn: 'root'
})

export class PositionProvider {

  public constructor(
    private positionService: PositionService
  ) { }

  public locate(): Observable<GeolocationCoordinates> {
    return this.positionService.navigatorPosition().pipe(
      map((position) => position.coords || throwError(null)),
      multicast(() => new ReplaySubject<GeolocationCoordinates>(1)),
      refCount()
    );
  }

}
