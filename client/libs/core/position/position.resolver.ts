import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { take } from 'rxjs/operators';
import { PositionProvider } from './position.provider';

@Injectable({ providedIn: 'root' })
export class PositionResolver implements Resolve<Coordinates> {

  public constructor(
    private positionProvider: PositionProvider
  ) { }

  public async resolve(): Promise<Coordinates> {
    return this.run();
  }

  private async run(): Promise<Coordinates> {
    return await this.positionProvider.locate().pipe(take(1)).toPromise();
  }

}
