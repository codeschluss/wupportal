import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { firebase } from '@firebase/app';
import '@firebase/messaging';
import { Message } from 'nativescript-plugin-firebase';
import { EMPTY, from, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { DeviceProvider } from '../device/device.provider';
import { ApplicationSettings } from '../tools/settings';
import { PushProvider as Compat } from './push.provider.i';

@Injectable({ providedIn: 'root' })
export class PushProvider implements Compat {

  public get messages(): Observable<Message & Notification> {
    return this.swPush.messages.pipe(map((event: any) => event.notification));
  }

  public get registerable(): boolean {
    return true
      && this.swPush.isEnabled
      && firebase.messaging.isSupported()
      && Notification.permission !== 'denied';
  }

  public constructor(
    private app: ApplicationSettings,
    private deviceProvider: DeviceProvider,
    private swPush: SwPush
  ) { }

  public registration(): Observable<string> {
    if (this.registerable) {
      const fcm = firebase.initializeApp(this.app.config.firebase).messaging();

      return from(this.deviceProvider.frontend.serviceWorker.ready).pipe(
        tap((worker) => fcm.useServiceWorker(worker as any)),
        mergeMap(() => from(fcm.getToken()))
      );
    }

    return EMPTY;
  }

}
