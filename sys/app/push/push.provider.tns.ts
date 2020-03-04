import { Injectable } from '@angular/core';
import { Message } from 'nativescript-plugin-firebase';
import { initFirebaseMessaging } from 'nativescript-plugin-firebase/messaging/messaging';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PushProvider as Compat } from './push.provider.i';

declare const FIRApp: any;

@Injectable({ providedIn: 'root' })
export class PushProvider implements Compat {

  private static configured: boolean = false;

  private events: Subject<Message> = new Subject<Message>();

  private token: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public get messages(): Observable<Message & Notification> {
    return this.events.asObservable() as any;
  }

  public get registerable(): boolean {
    return true;
  }

  public constructor() {
    if (typeof FIRApp !== 'undefined' && !PushProvider.configured) {
      PushProvider.configured = true;
      FIRApp.configure();
    }
  }

  public registration(): Observable<string> {
    initFirebaseMessaging({
      onMessageReceivedCallback: (event) => this.events.next(event),
      onPushTokenReceivedCallback: (token) => this.token.next(token)
    });

    return this.token.asObservable();
  }

}
