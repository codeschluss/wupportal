import { Injectable, NgZone } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { LocalStorage, VALIDATION_ERROR } from '@ngx-pwa/local-storage';
import { BehaviorSubject, catchError, filter, map, Observable, of, take, throwError } from 'rxjs';
import { PlatformProvider, SessionProvider } from '..';
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
      catchError((e) => e.message === VALIDATION_ERROR ? of() : throwError(e)),
      map((p) => p || new PushedModel())
    ).subscribe((pushed) => {
      this.pushed.next(pushed);

      this.value.subscribe((value) => {
        Object.setPrototypeOf(value, Object.prototype);
        localStorage.setItem('pushedNotifications', value).subscribe();
      });

      if (['android', 'ios'].includes(this.platformProvider.name)) {
        const fcm = cordova.plugins.firebase.messaging;
        const push = (event) => ngZone.run(() => this.push(event));

        sessionProvider.value.pipe(filter(({ subscriptionId }) => {
          return subscriptionId && subscriptionId !== 'blocked';
        }), take(1)).subscribe(() => {
          fcm.onBackgroundMessage((event) => push(event), console.error);
          fcm.onMessage((event) => push(event), console.error);
        });
      } else if ('browser' === this.platformProvider.name) {
        swPush.messages.subscribe(console.log);
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
      content: undefined,
      label: undefined,
      read: false,
      route: undefined,
      timestamp: Date.now()
    } as PushedModel['notifications'][number];

    switch (this.platformProvider.name) {
      case 'android':
        notification.content = event.gcm.body;
        notification.label = event.gcm.title;
        notification.route = event.gcm.route;
        break;

      case 'browser':
        alert(JSON.stringify(event));
        break;

      case 'ios':
        notification.content = event.aps.alert.body;
        notification.label = event.aps.alert.title;
        notification.route = event.aps.route;
        break;
    }

    this.pushed.next(Object.assign(this.pushed.value, {
      notifications: [notification].concat(this.pushed.value.notifications)
    }));
  }

}
