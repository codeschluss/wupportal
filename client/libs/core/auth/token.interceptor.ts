import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionProvider } from '../session/session.provider';
import { CoreSettings } from '../utils/settings';
import { AccessTokenModel } from './access-token.model';
import { RefreshTokenModel } from './refresh-token.model';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  private accessToken: AccessTokenModel;

  private refreshToken: RefreshTokenModel;

  public constructor(
    private coreSettings: CoreSettings,
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
        case this.coreSettings.authUrl: break;

        case this.coreSettings.refreshUrl: request = request.clone({
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
