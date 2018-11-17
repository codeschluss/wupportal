import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionProvider } from '../session/session.provider';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

  public bearer: string;

  public constructor(
    private session: SessionProvider
  ) {
    this.session.subscribe((next) => this.bearer = next.bearer);
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(!this.bearer ? req : req.clone({
      setHeaders: { 'Authorization': `Bearer ${this.bearer}` }
    }));
  }

}
