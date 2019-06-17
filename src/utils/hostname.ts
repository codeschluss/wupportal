import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientManifest } from './manifest';

@Injectable({ providedIn: 'root' })
export class Hostname implements HttpInterceptor {

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (request.url.startsWith('/')) {
      request = request.clone({
        url: ClientManifest.startUrl + request.url
      });
    }

    return next.handle(request);
  }

}
