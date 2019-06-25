import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreSettings } from '../utils/settings';
import { PlatformProvider } from './platform.provider';

@Injectable({ providedIn: 'root' })
export class PlatformInterceptor implements HttpInterceptor {

  public constructor(
    private coreSettings: CoreSettings,
    private platformProvider: PlatformProvider
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    switch (this.platformProvider.name) {
      case 'Android':
      case 'iOS':
        return this.handleNative(request, next);

      case 'Server':
        return this.handleServer(request, next);

      case 'Web':
        return next.handle(request);
    }
  }

  private handleServer(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (request.url.startsWith('/')) {
      const engine = this.platformProvider.engine;

      switch (true) {
        case request.url.startsWith(this.coreSettings.apiAuthUrl):
        case request.url.startsWith(this.coreSettings.apiRefreshUrl):
        case request.url.startsWith(this.coreSettings.apiRootUrl):
          const host = engine.request.hostname;
          const prot = engine.request.protocol;

          return next.handle(request.clone({
            url: `${prot}://${host}${request.url}`
          }));

        default:
          const file = `${engine.root}/client${request.url}`;

          return engine.read(file).pipe(map((buffer) => new HttpResponse<any>({
            body: buffer.toString(),
            status: 200,
            url: request.url
          })));
      }
    }

    return next.handle(request);
  }

  private handleNative(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (request.url.startsWith('/')) {
      request = request.clone({
        url: this.coreSettings.appRootUrl + request.url
      });
    }

    return next.handle(request);
  }

}
