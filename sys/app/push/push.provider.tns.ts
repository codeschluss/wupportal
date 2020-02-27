import { Injectable } from '@angular/core';
import { Message } from 'nativescript-plugin-firebase';
import { initFirebaseMessaging } from 'nativescript-plugin-firebase/messaging/messaging';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DeviceProvider } from '../device/device.provider';
import { PushProvider as Compat } from './push.provider.i';

declare const FIRApp: any;

@Injectable({ providedIn: 'root' })
export class PushProvider implements Compat {

  private receiver: Subject<Message>;

  private token: BehaviorSubject<string>;

  public get clicks(): Observable<Message> {
    return this.receiver.pipe(filter((message) => message.notificationTapped));
  }

  public get messages(): Observable<Message> {
    return this.receiver.asObservable();
  }

  public get registration(): Observable<string> {
    return this.token.pipe(filter(Boolean)) as Observable<string>;
  }

  public constructor(
    deviceProvider: DeviceProvider
  ) {
    this.receiver = new Subject<Message>();
    this.token = new BehaviorSubject<string>(null);

    switch (deviceProvider.notation) {
      case 'Android':
        break;

      case 'iOS':
        FIRApp.configure();
        break;
    }

    initFirebaseMessaging({
      onMessageReceivedCallback: (message) => this.receiver.next(message),
      onPushTokenReceivedCallback: (token) => this.token.next(token),
      showNotificationsWhenInForeground: true
    });
  }

}
