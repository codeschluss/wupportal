import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SessionModel } from './session.model';
import { SessionProvider } from './session.provider';

@Injectable({
  providedIn: 'root'
})

export class SessionResolver
  implements Resolve<SessionModel> {

  public constructor(
    private sessionProvider: SessionProvider
  ) { }

  public resolve(): Observable<SessionModel> {
    return this.sessionProvider.value.pipe(take(1));
  }

}
