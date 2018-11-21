import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessTokenModel } from '../auth/access-token.model';
import { TokenService } from '../auth/token.service';
import { SessionModel } from './session.model';
import { SessionResolver } from './session.resolver';

@Injectable({ providedIn: 'root' })
export class SessionProvider {

  private session: BehaviorSubject<SessionModel>;

  public constructor(
    private resolver: SessionResolver,
    private service: TokenService,
    private storage: LocalStorage
  ) {
    (this.session = new BehaviorSubject<SessionModel>(this.resolver.session))
      .subscribe(session => this.storage.setItemSubscribe('session', session));
  }

  public login(username: string, password: string): Promise<any> {
    return this.service.authLoginResponse(username, password).pipe(
      map((response) => this.update(response.statusText, response.body))
    ).toPromise();
  }

  public logout(): void {
    this.update('', new AccessTokenModel());
  }

  public refresh(): Promise<any> {
    return this.service.authRefreshResponse().pipe(
      map((response) => this.update(response.statusText, response.body))
    ).toPromise();
  }

  public subscribe(next?: (value: SessionModel) => void): Subscription {
    return this.session.subscribe((value) => next(value));
  }

  private update(bearer: string, token: AccessTokenModel): void {
    this.session.next(Object.assign(this.session.value, {
      bearer: bearer,
      token: token
    }));
  }

}
