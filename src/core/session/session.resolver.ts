import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { map, tap } from 'rxjs/operators';
import { SessionModel, SessionModelSchema } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionResolver implements Resolve<any> {

  private session: SessionModel;

  public constructor(
    private storage: LocalStorage
  ) { }

  public resolve(): Promise<SessionModel> {
    const schema = { schema: SessionModelSchema };
    return this.storage.getItem<SessionModel>('session', schema).pipe(
      map((session) => this.refresh(session)),
      tap((session) => this.session = session)
    ).toPromise();
  }

  public status(): SessionModel {
    return this.session;
  }

  private refresh(session: SessionModel): SessionModel {
    const created = SessionModel.new();
    const expired = session && session.token.exp < created.token.exp;
    return !session ? created : Object.assign(session, {
      bearer: expired ? created.bearer : session.bearer,
      token: expired ? created.token : session.token
    });
  }

}
