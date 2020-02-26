import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { firebase } from '@firebase/app';
import '@firebase/messaging';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DeviceProvider } from '../device/device.provider';
import { ApplicationSettings } from '../tools/settings';
import { PushProvider as Compat } from './push.provider.i';

@Injectable({ providedIn: 'root' })
export class PushProvider implements Compat {

  private token: BehaviorSubject<string>;

  public get clicks(): Observable<NotificationOptions> {
    return this.swPush.notificationClicks
      .pipe(map((click) => click.notification));
  }

  public get messages(): Observable<Notification> {
    return this.swPush.messages
      .pipe(map((message: any) => message.notification));
  }

  public get registration(): Observable<string> {
    return this.token.pipe(filter(Boolean)) as Observable<string>;
  }

  public constructor(
    private swPush: SwPush,
    app: ApplicationSettings,
    deviceProvider: DeviceProvider
  ) {
    this.token = new BehaviorSubject<string>(null);

    if (this.swPush.isEnabled && firebase.messaging.isSupported()) {
      const fcm = firebase.initializeApp(app.config.firebase).messaging();

      deviceProvider.frontend.serviceWorker.ready.then((worker) => {
        fcm.useServiceWorker(worker);
        fcm.getToken()
          .then((key) => this.token.next(key))
          .catch(() => { });
      });
    }
  }

}
