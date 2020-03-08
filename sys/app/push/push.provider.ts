import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { firebase } from '@firebase/app';
import '@firebase/messaging';
import { FirebaseMessaging } from '@firebase/messaging-types';
import { Message } from 'nativescript-plugin-firebase';
import { EMPTY, from, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { DeviceProvider } from '../device/device.provider';
import { ApplicationSettings } from '../tools/settings';
import { PushProvider as Compat } from './push.provider.i';

@Injectable({ providedIn: 'root' })
export class PushProvider implements Compat {

  private fcm: FirebaseMessaging;

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
    if (this.enabled && !this.fcm) {
      try {
        this.fcm = firebase.initializeApp(this.app.config.firebase).messaging();

        return from(this.deviceProvider.frontend.serviceWorker.ready).pipe(
          tap((worker) => this.fcm.useServiceWorker(worker as any)),
          mergeMap(() => from(this.fcm.getToken()))
        );
      } catch { }
    }

    return EMPTY;
  }

}
