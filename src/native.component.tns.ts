import { Component, NgZone, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformProvider } from '@wooportal/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { AndroidActivityEventData as ActivityEvent } from 'tns-core-modules/application';
import { ClientPackage } from './utils/package';

@Component({
  selector: 'native-component',
  template: `
    <page-router-outlet></page-router-outlet>
  `
})

export class NativeComponent {

  public static viewContainer: ViewContainerRef;

  public constructor(
    container: ViewContainerRef,
    platformProvider: PlatformProvider,
    router: Router,
    zone: NgZone
  ) {
    NativeComponent.viewContainer = container;

    switch (platformProvider.name) {
      case 'Android':
        fromEvent(platformProvider.engine, 'activityStarted').pipe(
          map((event: ActivityEvent) => event.activity.getIntent())
        ).subscribe((intent) => {
          if (intent.getData()) {
            let url = intent.getData().toString();
            intent.setData(null);

            if (url.startsWith(ClientPackage.config.defaults.appUrl)) {
              url = url.replace(ClientPackage.config.defaults.appUrl, '');
              zone.run(() => router.navigateByUrl(url));
            }
          }
        });
        break;
    }
  }

}
