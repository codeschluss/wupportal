import { Injectable } from '@angular/core';
import { Message, registerForPushNotifications } from 'nativescript-plugin-firebase';
import { firebase } from 'nativescript-plugin-firebase/firebase-common';
import { Observable, Subject } from 'rxjs';
import { PushProvider as Compat } from './push.provider.i';

declare const FIRApp: any;

@Injectable({ providedIn: 'root' })
export class PushProvider implements Compat {

  private events: Subject<Message> = new Subject<Message>();

  public get messages(): Observable<Message & Notification> {
    return this.events.asObservable() as any;
  }

  public get registerable(): boolean {
    return true;
  }

  public constructor() {
    if (typeof FIRApp !== 'undefined' && !firebase._configured) {
      firebase._configured = true;
      FIRApp.configure();
    }
  }

  public registration(): Observable<string> {
    return new Observable<string>((observer) => {
      registerForPushNotifications({
        onMessageReceivedCallback: (event) => this.events.next(event),
        onPushTokenReceivedCallback: (token) => observer.next(token)
      });

      return () => observer.complete();
    });
  }

}
