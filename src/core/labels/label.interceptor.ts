import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionProvider } from '../session/session.provider';
import { CoreSettings } from '../tools/settings';

@Injectable({
  providedIn: 'root'
})

export class LabelInterceptor implements HttpInterceptor {

  private language: string;

  public constructor(
    private settings: CoreSettings,
    session: SessionProvider
  ) {
    session.value.subscribe((next) => this.language = next.language);
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (this.language) {
      const { read, write } = this.settings.labelHeader;

      request = request.clone({
        setHeaders: {
          [read]: this.language,
          [write]: request.headers.get(write) || this.language
        }
      });
    }

    return next.handle(request);
  }

}
