import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { map, tap } from 'rxjs/operators';
import { SessionModel, SessionModelSchema } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionResolver implements Resolve<SessionModel> {

  public session: SessionModel;

  public constructor(
    private storage: LocalStorage
  ) { }

  public resolve(): Promise<SessionModel> {
    return this.session
      ? Promise.resolve(this.session)
      : this.resource();
  }

  private async resource(): Promise<SessionModel> {
    const schema = { schema: SessionModelSchema };
    return this.storage.getItem<SessionModel>('session', schema).pipe(
      map((session) => this.validate(session)),
      tap((session) => this.session = session)
    ).toPromise();
  }

  private validate(session: SessionModel): SessionModel {
    const created = SessionModel.new();
    const expired = session && session.token.exp < created.token.exp;
    return !session ? created : Object.assign(session, {
      bearer: expired ? created.bearer : session.bearer,
      token: expired ? created.token : session.token
    });
  }

}
