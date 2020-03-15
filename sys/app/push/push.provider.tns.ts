import { Injectable } from '@angular/core';
import { addOnPushTokenReceivedCallback, Message, registerForPushNotifications } from 'nativescript-plugin-firebase';
import { firebase } from 'nativescript-plugin-firebase/firebase-common';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { DeviceProvider } from '../device/device.provider';
import { PushProvider as Compat } from './push.provider.i';

declare const com: any;
declare const FIRApp: any;
declare const UIApplication: any;

@Injectable({ providedIn: 'root' })
export class PushProvider implements Compat {

  private events: BehaviorSubject<Message>;

  public get enabled(): boolean {
    switch (this.deviceProvider.notation) {
      case 'Android':
        const act = this.deviceProvider.frontend.foregroundActivity;
        const api = com.google.android.gms.common.GoogleApiAvailability;
        return api.getInstance().isGooglePlayServicesAvailable(act) === 0;

      case 'iOS':
        const app = UIApplication.sharedApplication;
        return !app.registeredForRemoteNotifications
          || app.currentUserNotificationSettings.types > 0;
    }
  }

  public get messages(): Observable<Message & Notification> {
    return this.events.pipe(filter(Boolean)) as Observable<any>;
  }

  public constructor(
    private deviceProvider: DeviceProvider
  ) {
    this.events = new BehaviorSubject<Message>(null);

    if (typeof FIRApp !== 'undefined' && !firebase._configured) {
      firebase._configured = true;
      FIRApp.configure();
    }
  }

  public registration(): Observable<string> {
    return from(registerForPushNotifications({
      onMessageReceivedCallback: (event) => this.events.next(event),
    })).pipe(mergeMap(() => new Observable<string>((observer) => {
      addOnPushTokenReceivedCallback((token) => {
        observer.next(token);
        observer.complete();
      });
    })));
  }

}
