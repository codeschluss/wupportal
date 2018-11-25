import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { map, tap } from 'rxjs/operators';
import { SessionModel } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionResolver implements Resolve<SessionModel> {

  public session: SessionModel;

  public constructor(
    private storage: LocalStorage
  ) { }

  public async resolve(): Promise<SessionModel> {
    return this.session ? Promise.resolve(this.session) : this.resolver();
  }

  private async resolver(): Promise<SessionModel> {
    const schema = { schema: SessionModel.schema };
    return this.storage.getItem<SessionModel>('session', schema).pipe(
      map((session) => session || new SessionModel()),
      tap((session) => this.session = session)
    ).toPromise();
  }

}
