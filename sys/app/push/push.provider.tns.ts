import { Injectable } from '@angular/core';
import { Message, registerForPushNotifications } from 'nativescript-plugin-firebase';
import { firebase } from 'nativescript-plugin-firebase/firebase-common';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PushProvider as Compat } from './push.provider.i';

declare const FIRApp: any;

@Injectable({ providedIn: 'root' })
export class PushProvider implements Compat {

  private events: BehaviorSubject<Message>;

  public get messages(): Observable<Message & Notification> {
    return this.events.pipe(filter(Boolean)) as Observable<any>;
  }

  public get registerable(): boolean {
    return true;
  }

  public constructor() {
    this.events = new BehaviorSubject<Message>(null);

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
