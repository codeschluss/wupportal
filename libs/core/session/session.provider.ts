import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject, empty, Observable, Subscription, timer } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { AccessTokenModel } from '../auth/access-token.model';
import { RefreshTokenModel } from '../auth/refresh-token.model';
import { TokenService } from '../auth/token.service';
import { SessionModel } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionProvider {

  private session: BehaviorSubject<SessionModel> = new BehaviorSubject(null);

  private timeout: Subscription = empty().subscribe();

  public constructor(
    private tokenService: TokenService,
    private localStorage: LocalStorage
  ) {
    const schema = { schema: SessionModel.schema };
    this.localStorage.getItem<SessionModel>('session', schema).pipe(
      map((session) => session || new SessionModel()),
      tap((session) => this.session.next(session)),
      map((session) => session.refreshToken.exp * 1000),
      mergeMap((exp) =>  exp > Date.now() ? this.refresh() : empty())
    ).subscribe(undefined, () => this.logout(), () => this.session.subscribe(
      (session) => localStorage.setItemSubscribe('session', session)));
  }

  public get value(): Observable<SessionModel> {
    return this.session.pipe(filter(Boolean));
  }

  public like(id: string): void {
    if (!this.session.value.likes.includes(id)) {
      this.session.next(Object.assign(this.session.value, {
        likes: this.session.value.likes.concat(id)
      }));
    }
  }

  public login(username: string, password: string): Observable<any> {
    return this.tokenService.apiLoginResponse(username, password).pipe(
      tap((response) => this.update(response.body)),
      tap(() => this.work(this.session.value)));
  }

  public logOut(): void {
    this.session.subscribe(session => {
      session.accessToken = new AccessTokenModel;
      session.refreshToken = new RefreshTokenModel;
      this.write(session);
    });
  }

  public changeLanguage(locale: string): void {
    this.session.subscribe(session => {
      session.language = locale;
      this.write(session);
    });
  }

  public logout(): void {
    this.timeout.unsubscribe();
    this.update({
      access: new AccessTokenModel(),
      refresh: new RefreshTokenModel()
    });
  }

  public refresh(): Observable<any> {
    return this.tokenService.apiRefreshResponse().pipe(
      tap((response) => this.update(response.body)),
      tap(() => this.work(this.session.value)));
  }

  private update(tokens: any): void {
    this.session.next(Object.assign(this.session.value, {
      accessToken: tokens.access || this.session.value.accessToken,
      refreshToken: tokens.refresh || this.session.value.refreshToken
    }));
  }

  private work(session: SessionModel): void {
    if (session.refreshToken.raw) {
      const accessExp = session.accessToken.exp * 1000 - Date.now();
      const refreshExp = session.refreshToken.exp * 1000 - Date.now();
      this.timeout.unsubscribe();

      this.timeout = refreshExp > accessExp
        ? timer(accessExp).subscribe(() => this.refresh().subscribe())
        : timer(refreshExp).subscribe(() => this.logout());
    }
  }

}
