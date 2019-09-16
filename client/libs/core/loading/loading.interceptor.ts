import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoadingProvider } from './loading.provider';

@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor {

  public constructor(
    private loadingProvider: LoadingProvider
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    this.loadingProvider.enqueue(request);

    return Observable.create((observer) => {
      const subscription = next.handle(request).pipe(
        filter((event) => event instanceof HttpResponse)
      ).subscribe(
        (event) => {
          this.loadingProvider.finished(request);
          observer.next(event);
        },
        (error) => {
          this.loadingProvider.finished(request);
          observer.error(error);
        },
        () => {
          this.loadingProvider.finished(request);
          observer.complete();
        }
      );

      return () => {
        this.loadingProvider.finished(request);
        subscription.unsubscribe();
      };
    });
  }

}
