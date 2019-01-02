import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokens } from '../utils/api';
import { CoreSettings } from '../utils/settings';
import { TokenProvider } from './token.provider';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  private tokens: AuthTokens;

  public constructor(
    private coreSettings: CoreSettings,
    tokenProvider: TokenProvider
  ) {
    tokenProvider.value.subscribe((tokens) => this.tokens = tokens);
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (request.url.startsWith(this.coreSettings.apiUrl) && this.tokens) {
      switch (request.url) {
        case this.coreSettings.apiAuthUrl: break;

        case this.coreSettings.apiRefreshUrl: request = request.clone({
            setHeaders: { 'Authorization': `Bearer ${this.tokens.refresh.raw}` }
        }); break;

        default: request = request.clone({
          setHeaders: { 'Authorization': `Bearer ${this.tokens.access.raw}` }
        }); break;
      }
    }

    return next.handle(request);
  }

}
