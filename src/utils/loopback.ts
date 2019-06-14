import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientPackage } from './package';

@Injectable({ providedIn: 'root' })
export class Loopback implements HttpInterceptor {

  public constructor(
    private httpClient: HttpClient,
    private injector: Injector
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (request.url.startsWith(ClientPackage.config.api.rootUrl)) {
      return this.httpClient.request(request);
    } else if (request.url.startsWith('/')) {
      // tslint:disable-next-line:deprecation
      const express = this.injector.get('express');
      const file = `${express.root}/client${request.url}`;

      return express.read(file).pipe(map((buffer) => new HttpResponse<any>({
        body: buffer.toString(),
        status: 200,
        url: request.url
      })));
    } else {
      return next.handle(request);
    }
  }

}
