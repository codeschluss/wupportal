import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingProvider } from './loading.provider';

@Injectable({
  providedIn: 'root'
})

export class LoadingInterceptor
  implements HttpInterceptor {

  public constructor(
    private loadingProvider: LoadingProvider
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    this.loadingProvider.enqueue(request);

    return new Observable<HttpEvent<any>>((observer) => {
      next.handle(request).subscribe(observer);
      return () => this.loadingProvider.finished(request);
    });
  }

}
