import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoadingProvider } from './loading.provider';

@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor {

  public constructor(
    private loadingProvicer: LoadingProvider
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    this.loadingProvicer.enqueue(request);

    return Observable.create((observer) => {
      const subscription = next.handle(request).pipe(
        filter((event) => event instanceof HttpResponse)
      ).subscribe(
        (event) => {
          this.loadingProvicer.finished(request);
          observer.next(event);
        },
        (error) => {
          this.loadingProvicer.finished(request);
          observer.error(error);
        },
        () => {
          this.loadingProvicer.finished(request);
          observer.complete();
        }
      );

      return () => {
        this.loadingProvicer.finished(request);
        subscription.unsubscribe();
      };
    });
  }

}
