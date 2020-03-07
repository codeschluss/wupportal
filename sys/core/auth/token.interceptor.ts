import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@wooportal/app';
import { Observable } from 'rxjs';
import { AuthTokens } from '../tools/api';
import { TokenProvider } from './token.provider';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  private tokens: AuthTokens;

  public constructor(
    private app: ApplicationSettings,
    tokenProvider: TokenProvider
  ) {
    tokenProvider.value.subscribe((tokens) => this.tokens = tokens);
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (request.url.startsWith(this.app.config.api.rootUrl) && this.tokens) {
      switch (request.url) {
        case this.app.config.api.authUrl:
          break;

        case this.app.config.api.refreshUrl:
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.tokens.refresh.raw}`
            }
          });
          break;

        default:
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.tokens.access.raw}`
            }
          });
          break;
      }
    }

    return next.handle(request);
  }

}
