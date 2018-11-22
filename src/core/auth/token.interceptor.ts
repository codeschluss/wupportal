import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfiguration } from '../api/api-configuration';
import { SessionProvider } from '../session/session.provider';
import { AccessTokenModel } from './access-token.model';
import { RefreshTokenModel } from './refresh-token.model';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  private accessToken: AccessTokenModel;

  private refreshToken: RefreshTokenModel;

  public constructor(
    private apiConfiguration: ApiConfiguration,
    private session: SessionProvider
  ) {
    this.session.subscribe((next) => {
      this.accessToken = next.accessToken;
      this.refreshToken = next.refreshToken;
    });
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (this.accessToken.exp && this.refreshToken.exp) {
      switch (request.url) {
        case this.apiConfiguration['authUrl']: request = request.clone({
          setHeaders: { 'Authorization': `Bearer ${this.accessToken.raw}` }
        }); break;

        case this.apiConfiguration['refreshUrl']: request = request.clone({
            setHeaders: { 'Authorization': `Bearer ${this.refreshToken.raw}` }
        }); break;
      }
    }


    return next.handle(request);
  }

}
