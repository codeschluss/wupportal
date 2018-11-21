import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionProvider } from '../session/session.provider';

@Injectable({ providedIn: 'root' })
export class AccessTokenInterceptor implements HttpInterceptor {

  public header: string;

  public constructor(
    private session: SessionProvider
  ) {
    this.session.subscribe((next) => this.header = next.accessToken.raw);
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(!this.header ? request : request.clone({
      setHeaders: { 'Authorization': `Bearer ${this.header}` }
    }));
  }

}
