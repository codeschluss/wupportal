import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { firebase } from '@firebase/app';
import '@firebase/messaging';
import { Message } from 'nativescript-plugin-firebase';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DeviceProvider } from '../device/device.provider';
import { ApplicationSettings } from '../tools/settings';
import { PushProvider as Compat } from './push.provider.i';

@Injectable({ providedIn: 'root' })
export class PushProvider implements Compat {

  public get enabled(): boolean {
    return this.swPush.isEnabled
      && firebase.messaging.isSupported()
      && Notification.permission !== 'denied';
  }

  public get messages(): Observable<Message & Notification> {
    return this.swPush.messages.pipe(map((event: any) => event.notification));
  }

  public constructor(
    private app: ApplicationSettings,
    private deviceProvider: DeviceProvider,
    private swPush: SwPush
  ) { }

  public registration(): Observable<string> {
    return from(this.deviceProvider.frontend.serviceWorker.ready).pipe(
      mergeMap((worker: ServiceWorkerRegistration) => {
        const app = firebase.initializeApp(this.app.config.firebase);
        const fcm = app.messaging();

        fcm.useServiceWorker(worker);
        return from(fcm.getToken());
      })
    );
  }

}
