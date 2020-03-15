import { Component, NgZone, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationSettings, DeviceProvider, PushProvider } from '@wooportal/app';
import { SessionProvider } from '@wooportal/core';
import { EMPTY, fromEvent } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AndroidActivityEventData as ActivityEvent } from 'tns-core-modules/application';

declare const java: any;

@Component({
  selector: 'native-component',
  template: `
    <page-router-outlet></page-router-outlet>
  `
})

export class NativeComponent {

  public static viewContainer: ViewContainerRef;

  public constructor(
    app: ApplicationSettings,
    container: ViewContainerRef,
    deviceProvider: DeviceProvider,
    pushProvider: PushProvider,
    router: Router,
    sessionProvider: SessionProvider,
    zone: NgZone
  ) {
    NativeComponent.viewContainer = container;

    if (sessionProvider.getSubscriptionId()) {
        pushProvider.registration().pipe(catchError(() => EMPTY)).subscribe();
    }

    switch (deviceProvider.notation) {
      case 'Android':
        sessionProvider.value.pipe(
          take(1), map((session) => new java.util.Locale(session.language))
        ).subscribe((locale) => java.util.Locale.setDefault(locale));

        fromEvent(deviceProvider.frontend, 'activityStarted').pipe(
          map((event: ActivityEvent) => event.activity.getIntent())
        ).subscribe((intent) => {
          if (intent.getData()) {
            let url = intent.getData().toString();
            intent.setData(null);

            if (url.startsWith(app.config.defaults.appUrl)) {
              url = url.replace(app.config.defaults.appUrl, '');
              zone.run(() => router.navigateByUrl(url));
            }
          }
        });
        break;

      case 'iOS':
        break;
    }
  }

}
