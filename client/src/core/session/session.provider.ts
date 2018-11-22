import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccessTokenModel } from '../auth/access-token.model';
import { RefreshTokenModel } from '../auth/refresh-token.model';
import { TokenService } from '../auth/token.service';
import { SessionModel } from './session.model';
import { SessionResolver } from './session.resolver';

@Injectable({ providedIn: 'root' })
export class SessionProvider {

  private session: BehaviorSubject<SessionModel>;

  private timeout: NodeJS.Timeout;

  public constructor(
    private service: TokenService,
    private storage: LocalStorage,

    resolver: SessionResolver
  ) {
    (this.session = new BehaviorSubject<SessionModel>(resolver.session))
      .subscribe(session => this.storage.setItemSubscribe('session', session));
  }

  public like(id: string): void {
    if (!this.session.value.likes.includes(id)) {
      this.session.next(Object.assign(this.session.value, {
        likes: this.session.value.likes.concat(id)
      }));
    }
  }

  public login(username: string, password: string): Promise<any> {
    return this.service.apiLoginResponse(username, password).pipe(
      tap((response) => this.update(response.body)),
      tap(() => this.worker())
    ).toPromise();
  }

  public logout(): void {
    this.update({
      access: new AccessTokenModel(),
      refresh: new RefreshTokenModel()
    });
  }

  public refresh(): Promise<any> {
    return this.service.apiRefreshResponse().pipe(
      tap((response) => this.update(response.body)),
      tap(() => this.worker())
    ).toPromise();
  }

  public status(): SessionModel {
    return this.session.value;
  }

  public subscribe(next: (value: SessionModel) => void): Subscription {
    return this.session.subscribe((value) => next(value));
  }

  private update(tokens: object): void {
    this.session.next(Object.assign(this.session.value, {
      accessToken: tokens['access'] || this.session.value.accessToken,
      refreshToken: tokens['refresh'] || this.session.value.refreshToken
    }));
  }

  private worker(): void {
    const refresh = this.session.value.refreshToken.exp * 1000 - Date.now();
    const worktime = this.session.value.accessToken.exp * 1000 - Date.now();

    !this.timeout && refresh > 0
      ? this.timeout = setTimeout(() => this.refresh(), worktime)
      : this.timeout = this.logout() as any;
  }

}
