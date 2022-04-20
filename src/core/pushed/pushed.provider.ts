import { Injectable, NgZone } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { LocalStorage, VALIDATION_ERROR } from '@ngx-pwa/local-storage';
import { BehaviorSubject, catchError, filter, map, Observable, of, take, throwError } from 'rxjs';
import { PlatformProvider } from '../platform/platform.provider';
import { SessionProvider } from '../session/session.provider';
import { PushedModel } from './pushed.model';

@Injectable({
  providedIn: 'root'
})

export class PushedProvider {

  private pushed: BehaviorSubject<PushedModel>;

  public get value(): Observable<PushedModel> {
    return this.pushed.pipe(filter(Boolean)) as Observable<PushedModel>;
  }

  public constructor(
    private platformProvider: PlatformProvider,
    localStorage: LocalStorage,
    ngZone: NgZone,
    sessionProvider: SessionProvider,
    swPush: SwPush
  ) {
    this.pushed = new BehaviorSubject<PushedModel>(null);

    localStorage.getItem<PushedModel>('pushedNotifications', {
      schema: PushedModel.schema
    }).pipe(
      map((pushedModel) => pushedModel || new PushedModel()),
      catchError((error) => {
        if (error.message === VALIDATION_ERROR) {
          return of(new PushedModel());
        }

        return throwError(error);
      })
    ).subscribe((pushed) => {
      this.pushed.next(pushed);

      this.value.subscribe((value) => {
        Object.setPrototypeOf(value, Object.prototype);
        localStorage.setItem('pushedNotifications', value).subscribe();
      });

      if (this.platformProvider.name === 'browser') {
        swPush.messages.subscribe((event) => this.push(event));
        this.platformProvider.navigator.serviceWorker.ready.then((sw) => {
          sw.active.postMessage(null);
        }).catch(console.error);
      } else if (['android', 'ios'].includes(this.platformProvider.name)) {
        const fcm = cordova.plugins.firebase.messaging;
        const push = (event) => ngZone.run(() => this.push(event));

        sessionProvider.value.pipe(filter(({ subscriptionId }) => {
          return subscriptionId && subscriptionId !== 'blocked';
        }), take(1)).subscribe(() => {
          // fcm.onBackgroundMessage((event) => push(event), console.error);
          fcm.onMessage((event) => push(event), console.error);
        });
      }
    });
  }

  public getRead(item: PushedModel['notifications'][number]): boolean {
    return this.pushed.value.notifications.find((i) => {
      return i.timestamp === item.timestamp;
    })?.read;
  }

  public setRead(item: PushedModel['notifications'][number]): void {
    if (!this.getRead(item)) {
      this.pushed.next(Object.assign(this.pushed.value, {
        notifications: this.pushed.value.notifications.map((i) => {
          if (i.timestamp === item.timestamp) {
            return Object.assign(i, { read: true });
          }

          return i;
        })
      }));
    }
  }

  private push(event: any): void {
    const notification = {
      content: null,
      label: null,
      read: false,
      route: null,
      timestamp: Date.now()
    } as PushedModel['notifications'][number];

    switch (this.platformProvider.name) {
      case 'android':
        notification.content = event.gcm.body;
        notification.label = event.gcm.title;
        notification.route = event.route;
        break;

      case 'browser':
        notification.content = event.notification.body;
        notification.label = event.notification.title;
        notification.route = event.notification.route;
        break;

      case 'ios':
        notification.content = event.aps.alert.body;
        notification.label = event.aps.alert.title;
        notification.route = event.aps.route;
        break;
    }

    if (!notification.route) {
      delete notification.route;
    }

    this.pushed.next(Object.assign(this.pushed.value, {
      notifications: [notification].concat(this.pushed.value.notifications)
    }));
  }

}
