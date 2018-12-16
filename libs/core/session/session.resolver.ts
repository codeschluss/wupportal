import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SessionModel } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionResolver implements Resolve<SessionModel> {

  public static session: SessionModel;

  public get session(): SessionModel { return SessionResolver.session; }
  public set session(set: SessionModel) { SessionResolver.session = set; }

  public constructor(
    private storage: LocalStorage
  ) { }

  public async resolve(): Promise<SessionModel> {
    return this.run();
  }

  private async run(): Promise<SessionModel> {
    const schema = { schema: SessionModel.schema };
    const session = this.storage.getItem<SessionModel>('session', schema);
    return this.session = await session.toPromise() || new SessionModel();
  }

}
