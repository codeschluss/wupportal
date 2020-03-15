import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileSystem } from '../locals/locals';
import { ApplicationSettings } from '../tools/settings';
import { DeviceProvider } from './device.provider';

@Injectable({ providedIn: 'root' })
export class DeviceInterceptor implements HttpInterceptor {

  public constructor(
    private app: ApplicationSettings,
    private deviceProvider: DeviceProvider
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    switch (this.deviceProvider.notation) {
      case 'Android':
        return this.handleNative(request, next);

      case 'Browser':
        return next.handle(request);

      case 'iOS':
        return this.handleNative(request, next);

      case 'Server':
        return this.handleServer(request, next);
    }
  }

  private handleNative(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (request.url.startsWith('/')) {
      switch (true) {
        case request.url.endsWith('.xliff'):
          const i18n = FileSystem.knownFolders.currentApp().getFolder('i18n');
          const file = i18n.getFile(request.url.split('/').pop()).readText();
          return from(file).pipe(map((xliff) => new HttpResponse<any>({
            body: xliff,
            status: 200,
            url: request.url
          })));

        default:
          return next.handle(request.clone({
            url: this.app.config.defaults.appUrl + request.url
          }));
      }
    }

    return next.handle(request);
  }

  private handleServer(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (request.url.startsWith('/')) {
      const engine = this.deviceProvider.frontend;

      switch (true) {
        case request.url.startsWith(this.app.config.api.authUrl):
        case request.url.startsWith(this.app.config.api.refreshUrl):
        case request.url.startsWith(this.app.config.api.rootUrl):
          const host = engine.request.hostname;
          const prot = engine.request.protocol;
          return next.handle(request.clone({
            url: `${prot}://${host}${request.url}`
          }));

        default:
          const file = `${engine.path}/browser${request.url}`;
          return engine.read(file).pipe(map((buffer) => new HttpResponse<any>({
            body: buffer.toString(),
            status: 200,
            url: request.url
          })));
      }
    }

    return next.handle(request);
  }

}
