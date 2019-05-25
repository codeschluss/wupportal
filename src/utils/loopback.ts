import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Loopback implements HttpInterceptor {

  public constructor(
    private injector: Injector
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (request.url.startsWith('/')) {
      // tslint:disable-next-line:deprecation
      const express = this.injector.get('express');
      const file = express.root + '/client' + request.url;

      return express.read(file).pipe(map((buffer) => new HttpResponse<any>({
        body: buffer.toString(),
        status: 200,
        url: request.url
      })));
    }

    return next.handle(request);
  }

}
