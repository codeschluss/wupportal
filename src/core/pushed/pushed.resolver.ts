import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PushedModel } from './pushed.model';
import { PushedProvider } from './pushed.provider';

@Injectable({
  providedIn: 'root'
})

export class PushedResolver
  implements Resolve<PushedModel> {

  public constructor(
    private pushedProvider: PushedProvider
  ) { }

  public resolve(): Observable<PushedModel> {
    return this.pushedProvider.value.pipe(take(1));
  }

}
