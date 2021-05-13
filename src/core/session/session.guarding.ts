import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { LoadingProvider } from '../loading/loading.provider';
import { SubscriptionProvider } from '../providers/subscription.provider';
import { SessionProvider } from './session.provider';

@Injectable({
  providedIn: 'root'
})

export class SessionGuarding
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
  ): Observable<true | UrlTree> {
    return this.sessionProvider.value.pipe(take(1), mergeMap((session) => {
      switch (session.subscriptionId) {
        case '':
          const block = Object.create(HttpRequest);
          const fcm = cordova.plugins.firebase.messaging;
          this.loadingProvider.enqueue(block);

          return from(fcm.requestPermission().then(() => fcm.getToken())).pipe(
            mergeMap((token) => this.subscriptionProvider.create({
              authSecret: token,
              locale: this.sessionProvider.getLanguage()
            })),
            map(({ id }) => {
              this.loadingProvider.finished(block);
              this.sessionProvider.setSubscriptionId(id);
              return this.router.createUrlTree(['/', 'notifications', id]);
            }),
            catchError(() => {
              this.loadingProvider.finished(block);
              this.sessionProvider.setSubscriptionId('blocked');
              return of(this.router.createUrlTree(['/', 'error', 400]));
            })
          );

        case 'blocked':
          return of(this.router.createUrlTree(['/', 'error', 400]));

        default:
          return of(session.subscriptionId).pipe(map((id) => {
            return state.url.endsWith(id)
              || this.router.createUrlTree(['/', 'notifications', id])
          }));
      }
    }));
  }

}
