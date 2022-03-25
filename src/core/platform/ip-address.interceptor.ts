import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IpAddressInterceptor
  implements HttpInterceptor {

  public constructor(
    private localStorage: LocalStorage,
    private http: HttpClient
  ) { }

  public retrieveIpAddress(): Observable<any> {
    return this.http.get('https://api.ipify.org/?format=json').pipe(
      switchMap((response: any) => this.localStorage.setItem('ip', response.ip)),
      catchError(() => of())
    );
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return this.localStorage.getItem('ip').pipe(
      map(ip => ip
        ? request.clone({headers: request.headers.set('x-real-ip', String(ip))}) 
        : request),
      catchError(() => of(request)),
      switchMap(request => next.handle(request))
    );
  }

}
