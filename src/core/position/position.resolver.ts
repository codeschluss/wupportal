import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PositionProvider } from './position.provider';

@Injectable({
  providedIn: 'root'
})

export class PositionResolver
  implements Resolve<GeolocationCoordinates> {

  public constructor(
    private positionProvider: PositionProvider
  ) { }

  public resolve(): Observable<GeolocationCoordinates> {
    return this.positionProvider.locate().pipe(take(1));
  }

}
