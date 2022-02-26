import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mapTo, mergeMap, take } from 'rxjs/operators';
import { LoadingProvider } from '../loading/loading.provider';
import { SubscriptionModel } from '../models/subscription.model';
import { SubscriptionProvider } from '../providers/subscription.provider';
import { SessionProvider } from '../session/session.provider';

@Injectable({
  providedIn: 'root'
})

export class PushedGuarding
  implements CanActivate {

  public constructor(
    private loadingProvider: LoadingProvider,
    private router: Router,
    private sessionProvider: SessionProvider,
    private subscriptionProvider: SubscriptionProvider
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.sessionProvider.value.pipe(take(1), mergeMap((session) => {
      switch (session.subscriptionId) {
        case '':
          return this.requestActivation().pipe(mapTo(true), catchError(() => {
            return of(this.router.createUrlTree(['/', 'error', 451]))
          }));

        case 'blocked':
          return of(this.router.createUrlTree(['/', 'error', 451]));

        default:
          return of(true);
      }
    }));
  }

  public requestActivation(): Observable<SubscriptionModel> {
    const block = Object.create(HttpRequest);
    const fcm = cordova.plugins.firebase.messaging;
    this.loadingProvider.enqueue(block);

    return from(fcm.requestPermission().then(() => fcm.getToken())).pipe(
      mergeMap((token) => this.subscriptionProvider.create({
        authSecret: token,
        locale: this.sessionProvider.getLanguage()
      })),
      map((subscription) => {
        this.loadingProvider.finished(block);
        this.sessionProvider.setSubscriptionId(subscription.id);
        return subscription;
      }),
      catchError((error) => {
        this.loadingProvider.finished(block);
        this.sessionProvider.setSubscriptionId('blocked');
        return throwError(error);
      })
    );
  }

}
