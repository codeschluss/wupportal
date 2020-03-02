import { Component, NgZone, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { ApplicationSettings, DeviceProvider, PushProvider } from '@wooportal/app';
import { SessionProvider } from '@wooportal/core';
import { fromEvent } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AndroidActivityEventData as ActivityEvent } from 'tns-core-modules/application';
import { alert, confirm } from 'tns-core-modules/ui/dialogs';

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
    i18n: I18n,
    pushProvider: PushProvider,
    router: Router,
    sessionProvider: SessionProvider,
    zone: NgZone
  ) {
    NativeComponent.viewContainer = container;

    if (sessionProvider.getSubscriptionId()) {
      pushProvider.registration();
    }

    pushProvider.messages.subscribe((event) => {
      let route; switch (deviceProvider.notation) {
        case 'Android': route = event.data.route; break;
        case 'iOS': route = event.data.aps.route; break;
      }

      if (event.foreground && route) {
        confirm({
          cancelButtonText: i18n({ id: 'close', value: 'close' }),
          message: event.body,
          okButtonText: i18n({ id: 'details', value: 'details' }),
          title: event.title
        }).then((open) => open && zone.run(() => router.navigateByUrl(route)));
      } else if (event.foreground) {
        alert({
          message: event.body,
          okButtonText: i18n({ id: 'close', value: 'close' }),
          title: event.title
        });
      } else if (route) {
        zone.run(() => router.navigateByUrl(route));
      }
    });

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
