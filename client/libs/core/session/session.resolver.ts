import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SessionModel } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionResolver implements Resolve<SessionModel> {

  public session: SessionModel;

  public constructor(
    private storage: LocalStorage
  ) { }

  public async resolve(): Promise<SessionModel> {
    return this.resolver();
  }

  private async resolver(): Promise<SessionModel> {
    const schema = { schema: SessionModel.schema };
    const session = this.storage.getItem<SessionModel>('session', schema);
    return this.session = await session.toPromise() || new SessionModel();
  }

}
