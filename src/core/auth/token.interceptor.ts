import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionProvider } from '../session/session.provider';
import { ClientPackage } from '../utils/package';
import { AccessTokenModel } from './access-token.model';
import { RefreshTokenModel } from './refresh-token.model';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  private accessToken: AccessTokenModel;

  private refreshToken: RefreshTokenModel;

  public constructor(
    private clientPackage: ClientPackage,
    private session: SessionProvider
  ) {
    this.session.subscribe((next) => {
      this.accessToken = next.accessToken;
      this.refreshToken = next.refreshToken;
    });
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (this.accessToken.raw && this.refreshToken.raw) {
      switch (request.url) {
        case this.clientPackage.config.api.authUrl: break;

        case this.clientPackage.config.api.refreshUrl: request = request.clone({
            setHeaders: { 'Authorization': `Bearer ${this.refreshToken.raw}` }
        }); break;

        default: request = request.clone({
          setHeaders: { 'Authorization': `Bearer ${this.accessToken.raw}` }
        }); break;
      }
    }

    return next.handle(request);
  }

}
