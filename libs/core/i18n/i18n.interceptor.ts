import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionProvider } from '../session/session.provider';

@Injectable({ providedIn: 'root' })
export class I18nInterceptor implements HttpInterceptor {

  private language: string;

  public constructor(
    private session: SessionProvider
  ) {
    this.session.value.subscribe((next) => this.language = next.language);
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(!this.language ? request : request.clone({
      setHeaders: { 'Accept-Language': this.language }
    }));
  }

}
