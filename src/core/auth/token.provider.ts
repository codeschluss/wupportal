import { Injectable } from '@angular/core';
import { LocalStorage, VALIDATION_ERROR } from '@ngx-pwa/local-storage';
import { BehaviorSubject, combineLatest, EMPTY, Observable, of, Subscription, throwError, timer } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { AuthTokens } from '../tools/api';
import { Base64 } from '../tools/base64';
import { AccessTokenModel } from './access-token.model';
import { RefreshTokenModel } from './refresh-token.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

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
      catchError((e) => e.message === VALIDATION_ERROR ? of() : throwError(e)),
      mergeMap((token: RefreshTokenModel) => this.validate(token)),
      map((tokens: AuthTokens) => this.update(tokens)),
      tap((tokens: AuthTokens) => this.work(tokens))
    ).subscribe(() => this.refreshToken.subscribe((token) => {
      Object.setPrototypeOf(token, Object.prototype);
      localStorage.setItem('refreshToken', token).subscribe();
    }));
  }

  public login(username: string, password: string): Observable<AuthTokens> {
    return this.tokenService.apiLogin(username, password).pipe(
      map((body) => this.tokenize(body)),
      map((tokens) => this.update(tokens)),
      tap((tokens) => this.work(tokens))
    );
  }

  public refresh(): Observable<AuthTokens> {
    return this.tokenService.apiRefresh().pipe(
      map((body) => this.tokenize(body)),
      map((tokens) => this.update(tokens)),
      tap((tokens) => this.work(tokens))
    );
  }

  public remove(): void {
    this.timeout.unsubscribe();
    this.accessToken.next(new AccessTokenModel());
    this.refreshToken.next(new RefreshTokenModel());
  }

  private tokenize(body: object): AuthTokens {
    const tokens = { };

    Object.keys(body).forEach((type) => {
      const base64 = body[type].split('.')[1];
      const token = JSON.parse(Base64.decode(base64));

      let item; switch (type) {
        case 'access': item = new AccessTokenModel(); break;
        case 'refresh': item = new RefreshTokenModel(); break;
      }

      token.exp = token.exp - 5;
      token.raw = body[type];
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
      ? this.tokenService.apiRefresh(token).pipe(
        map((body) => this.tokenize(body)),
        map((tokens) => ({ access: tokens.access, refresh: token })),
        catchError(() => of(defaults)))
      : of(defaults);
  }

  private work(tokens: AuthTokens): void {
    const accessExp = tokens.access.exp * 1000 - Date.now();
    const refreshExp = tokens.refresh.exp * 1000 - Date.now();

    if (tokens.access.exp || tokens.refresh.exp) {
      this.timeout.unsubscribe();
      this.timeout = refreshExp > accessExp
        ? timer(accessExp).subscribe(() => this.refresh().subscribe())
        : timer(refreshExp).subscribe(() => this.remove());
    }
  }

}
