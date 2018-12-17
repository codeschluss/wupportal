import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject, empty, Observable, of, Subscription, timer } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { AccessTokenModel } from '../auth/access-token.model';
import { RefreshTokenModel } from '../auth/refresh-token.model';
import { TokenService } from '../auth/token.service';
import { SessionModel } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionProvider {

  private session: BehaviorSubject<SessionModel> = new BehaviorSubject(null);

  private timeout: Subscription = empty().subscribe();

  private readonly tokens: object = {
    access: new AccessTokenModel(),
    refresh: new RefreshTokenModel()
  };

  public constructor(
    private tokenService: TokenService,
    localStorage: LocalStorage
  ) {
    const schema = { schema: SessionModel.schema };
    localStorage.getItem<SessionModel>('session', schema).pipe(
      map((session) => session || new SessionModel()),
      mergeMap((session) => this.validate(session)),
      tap((session) => this.session.next(session))
    ).subscribe(() => this.value.subscribe((session) =>
      localStorage.setItemSubscribe('session', session)));
  }

  public get value(): Observable<SessionModel> {
    return this.session.pipe(filter(Boolean));
  }

  public login(username: string, password: string): Observable<any> {
    return this.tokenService.apiLoginResponse(username, password).pipe(
      map((response) => this.tokenize(this.session.value, response.body)),
      tap((session) => this.session.next(session)),
      tap(() => this.work(this.session.value)));
  }

  public refresh(): Observable<any> {
    return this.tokenService.apiRefreshResponse().pipe(
      map((response) => this.tokenize(this.session.value, response.body)),
      tap((session) => this.session.next(session)),
      tap(() => this.work(this.session.value)));
  }

  public logout(): void {
    this.timeout.unsubscribe();
    this.session.next(this.tokenize(this.session.value, this.tokens));
  }

  public like(id: string): void {
    if (!this.session.value.likes.includes(id)) {
      this.session.next(Object.assign(this.session.value, {
        likes: this.session.value.likes.concat(id)
      }));
    }
  }

  private tokenize(session: SessionModel, tokens: any): SessionModel {
    return Object.assign(session, {
      accessToken: tokens.access || session.accessToken,
      refreshToken: tokens.refresh || session.refreshToken
    });
  }

  private validate(session: SessionModel): Observable<SessionModel> {
    return session.refreshToken.exp * 1000 < Date.now()
      ? of(this.tokenize(session, this.tokens))
      : this.tokenService.apiRefreshResponse(session.refreshToken).pipe(
        map((response) => response.body),
        catchError(() => of(this.tokens)),
        map((tokens) => this.tokenize(session, tokens)));
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
