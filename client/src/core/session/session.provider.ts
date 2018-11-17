import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StrictHttpResponse } from '../api/strict-http-response';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthService } from '../auth/auth.service';
import { TokenModel } from '../auth/token.model';
import { SessionModel } from './session.model';
import { SessionResolver } from './session.resolver';

@Injectable({ providedIn: 'root' })
export class SessionProvider {

  private session: BehaviorSubject<SessionModel>;

  public constructor(
    private interceptor: AuthInterceptor,
    private resolver: SessionResolver,
    private service: AuthService,
    private storage: LocalStorage
  ) {
    (this.session = new BehaviorSubject<SessionModel>(this.resolver.status()))
      .subscribe((session) => this.storage.setItem('session', session)
        .subscribe(() => this.interceptor.bearer = session.bearer));
  }

  public login(username: string, password: string): Promise<void> {
    return this.service.authLoginResponse(username, password).pipe(
      map((response) => this.decode(response))
    ).toPromise();
  }

  public logout(): Promise<void> {
    return this.storage.setItem('session', Object.assign(this.session.value, {
      bearer: '',
      token: TokenModel.new()
    })).pipe(map(() => null)).toPromise();
  }

  public status(): Observable<SessionModel> {
    return this.session.asObservable();
  }

  private decode(response: StrictHttpResponse<object>): void {
    const bearer = response.headers.get('authorization').split(' ')[1];
    const token = JSON.parse(atob(bearer.split('.')[1]));
    this.session.next(Object.assign(this.session.value, { bearer, token }));
  }

}
