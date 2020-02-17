import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionProvider } from '../session/session.provider';

@Injectable({ providedIn: 'root' })
export class LabelsInterceptor implements HttpInterceptor {

  private language: string;

  public constructor(
    private session: SessionProvider
  ) {
    this.session.value.subscribe((next) => this.language = next.language);
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const headers = {
      'Accept-Language': this.language,
      'Content-Language': request.headers
        .get('Content-Language') || this.language
    };

    return next.handle(!this.language ? request : request.clone({
      setHeaders: headers
    }));
  }

}
