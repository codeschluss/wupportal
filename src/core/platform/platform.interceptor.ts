import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreSettings } from '../tools/settings';
import { PlatformProvider } from './platform.provider';

@Injectable({
  providedIn: 'root'
})

export class PlatformInterceptor
  implements HttpInterceptor {

  public constructor(
    private platformProvider: PlatformProvider,
    private settings: CoreSettings
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const clone: any = {
      setHeaders: { 'content-type': 'application/json' }
    };

    if (
      this.platformProvider.name !== 'browser' && request.url.startsWith('/')
    ) {
      clone.url = this.settings.app.baseUrl + request.url;
    }

    return next.handle(request.clone(clone));
  }

}
