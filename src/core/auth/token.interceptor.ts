import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokens } from '../tools/api';
import { CoreSettings } from '../tools/settings';
import { TokenProvider } from './token.provider';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor
  implements HttpInterceptor {

  private tokens: AuthTokens;

  public constructor(
    private settings: CoreSettings,
    tokenProvider: TokenProvider
  ) {
    tokenProvider.value.subscribe((next) => this.tokens = next);
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (this.tokens) {
      const { access, refresh } = this.tokens;
      const url = request.url.replace(this.settings.app.baseUrl, '');

      switch (true) {
        default:
        case url === this.settings.api.authUrl:
          break;

        case url === this.settings.api.refreshUrl:
          request = request.clone({
            setHeaders: { authorization: `Bearer ${refresh.raw}` }
          });
          break;

        case url.startsWith(this.settings.api.rootUrl):
          request = request.clone({
            setHeaders: { authorization: `Bearer ${access.raw}` }
          });
          break;
      }
    }

    return next.handle(request);
  }

}
