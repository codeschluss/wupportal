import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { take } from 'rxjs/operators';
import { SessionModel } from './session.model';
import { SessionProvider } from './session.provider';

@Injectable({ providedIn: 'root' })
export class SessionResolver implements Resolve<SessionModel> {

  public constructor(
    private sessionProvider: SessionProvider
  ) { }

  public async resolve(): Promise<SessionModel> {
    return this.run();
  }

  private async run(): Promise<SessionModel> {
    return await this.sessionProvider.value.pipe(take(1)).toPromise();
  }

}
