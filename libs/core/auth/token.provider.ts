import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject, combineLatest, EMPTY, Observable, of, Subscription, timer } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { AuthTokens, StrictHttpResponse } from '../utils/api';
import { Base64 } from '../utils/base64';
import { AccessTokenModel } from './access-token.model';
import { RefreshTokenModel } from './refresh-token.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class TokenProvider {

  private accessToken: BehaviorSubject<AccessTokenModel>;

  private refreshToken: BehaviorSubject<RefreshTokenModel>;

  private timeout: Subscription = EMPTY.subscribe();

  public get value(): Observable<AuthTokens> {
    return combineLatest([
      this.accessToken.pipe(filter(Boolean)),
      this.refreshToken.pipe(filter(Boolean))
    ]).pipe(map(([accessToken, refreshToken]) => ({
      access: accessToken as AccessTokenModel,
      refresh: refreshToken as RefreshTokenModel
    })));
  }

  public constructor(
    private tokenService: TokenService,
    localStorage: LocalStorage
  ) {
    this.accessToken = new BehaviorSubject<AccessTokenModel>(null);
    this.refreshToken = new BehaviorSubject<RefreshTokenModel>(null);

    localStorage.getItem<RefreshTokenModel>('refreshToken', {
        schema: RefreshTokenModel.schema
    }).pipe(
      mergeMap((token: RefreshTokenModel) => this.validate(token)),
      map((tokens: AuthTokens) => this.update(tokens)),
      tap((tokens: AuthTokens) => this.work(tokens))
    ).subscribe(() => this.refreshToken.subscribe((token) => {
      Object.setPrototypeOf(token, Object.prototype);
      localStorage.setItem('refreshToken', token).subscribe();
    }));
  }

  public login(username: string, password: string): Observable<AuthTokens> {
    return this.tokenService.apiLoginResponse(username, password).pipe(
      map((response) => this.tokenize(response)),
      map((tokens) => this.update(tokens)),
      tap((tokens) => this.work(tokens))
    );
  }

  public refresh(): Observable<AuthTokens> {
    return this.tokenService.apiRefreshResponse().pipe(
      map((response) => this.tokenize(response)),
      map((tokens) => this.update(tokens)),
      tap((tokens) => this.work(tokens))
    );
  }

  public remove(): void {
    this.timeout.unsubscribe();
    this.accessToken.next(new AccessTokenModel());
    this.refreshToken.next(new RefreshTokenModel());
  }

  private tokenize(response: StrictHttpResponse<any>): AuthTokens {
    const tokens = { };

    Object.keys(response.body).forEach((type) => {
      const base64 = response.body[type].split('.')[1];
      const token = JSON.parse(Base64.decode(base64));

      let item; switch (type) {
        case 'access': item = new AccessTokenModel(); break;
        case 'refresh': item = new RefreshTokenModel(); break;
      }

      token.exp = token.exp - 5;
      token.raw = response.body[type];
      tokens[type] = Object.assign(item, token);
    });

    return tokens as AuthTokens;
  }

  private update(tokens: AuthTokens): AuthTokens {
    if (tokens.access) { this.accessToken.next(tokens.access); }
    if (tokens.refresh) { this.refreshToken.next(tokens.refresh); }

    return {
      access: this.accessToken.value,
      refresh: this.refreshToken.value
    };
  }

  private validate(token: RefreshTokenModel): Observable<AuthTokens> {
    const defaults = {
      access: new AccessTokenModel(),
      refresh: new RefreshTokenModel()
    };

    return token && token.exp * 1000 > Date.now()
      ? this.tokenService.apiRefreshResponse(token).pipe(
        map((response) => this.tokenize(response)),
        map((tokens) => ({ access: tokens.access, refresh: token })),
        catchError(() => of(defaults)))
      : of(defaults);
  }

  private work(tokens: AuthTokens): void {
    const accessExp = tokens.access.exp * 1000 - Date.now();
    const refreshExp = tokens.refresh.exp * 1000 - Date.now();
    this.timeout.unsubscribe();

    this.timeout = refreshExp > accessExp
      ? timer(accessExp).subscribe(() => this.refresh().subscribe())
      : timer(refreshExp).subscribe(() => this.remove());
  }

}
