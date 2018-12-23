import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PositionService } from './position.service';

@Injectable({ providedIn: 'root' })
export class PositionProvider {

  public constructor(
    private positionService: PositionService
  ) { }

  public locate(): Observable<Coordinates> {
    return this.positionService.navigatorPositionResponse().pipe(
      map((response) => response ? response.coords : null));
  }

}
