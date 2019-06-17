import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientPackage } from './package';

@Injectable({ providedIn: 'root' })
export class Loopback implements HttpInterceptor {

  public constructor(
    private injector: Injector
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (request.url.startsWith('/')) {
      switch (true) {
        case request.url.startsWith(ClientPackage.config.api.authUrl):
        case request.url.startsWith(ClientPackage.config.api.refreshUrl):
        case request.url.startsWith(ClientPackage.config.api.rootUrl):
          return this.readHost(request, next);

        default:
          return this.readFile(request);
      }
    }

    return next.handle(request);
  }

  private readFile(request: HttpRequest<any>):
    Observable<HttpEvent<any>> {

    const express = this.injector.get('express');
    const file = `${express.root}/client${request.url}`;

    return express.read(file).pipe(map((buffer) => new HttpResponse<any>({
      body: buffer.toString(),
      status: 200,
      url: request.url
    })));
  }

  private readHost(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const express = this.injector.get('express');
    const host = express.request.hostname;
    const prot = express.request.protocol;

    return next.handle(request.clone({
      url: `${prot}://${host}${request.url}`
    }));
  }

}
