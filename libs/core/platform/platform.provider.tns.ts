import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, multicast, refCount } from 'rxjs/operators';
import { android as androidApp, ios as iosApp } from 'tns-core-modules/application';
import { connectionType, getConnectionType, startMonitoring, stopMonitoring } from 'tns-core-modules/connectivity';
import { device } from 'tns-core-modules/platform';
import { openUrl } from 'tns-core-modules/utils/utils';
import { CoreSettings } from '../utils/settings';
import { PlatformProvider as Compat } from './platform.provider.i';

declare const android: any;

let navigate: (url: string) => Promise<boolean>;

@Injectable({ providedIn: 'root' })
export class PlatformProvider implements Compat {

  public readonly chromeClient: any = android.webkit.WebChromeClient.extend({
    onGeolocationPermissionsShowPrompt: (url: string, callback: any) => {
      if (url.startsWith(this.coreSettings.appUrl)) {
        callback.invoke(url, true, false);
      }
    }
  });

  public readonly viewClient: any = android.webkit.WebViewClient.extend({
    shouldOverrideUrlLoading: (_: any, url: any) => {
      url = typeof url === 'string' ? url : url.getUrl().toString();

      if (url.startsWith(this.coreSettings.appUrl)) {
        navigate(url.replace(this.coreSettings.appUrl, ''));
      } else {
        openUrl(url);
      }

      return true;
    }
  });

  public get connected(): boolean {
    return this.online(getConnectionType());
  }

  public get connection(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      startMonitoring((change) => observer.next(this.online(change)));

      return () => {
        stopMonitoring();
        observer.complete();
      };
    }).pipe(multicast(() => new ReplaySubject<boolean>(1)), refCount());
  }

  public get engine(): any {
    switch (this.name) {
      case 'Android': return androidApp;
      case 'iOS': return iosApp;
    }
  }

  public get language(): string {
    return device.language || this.coreSettings.defaultLanguage;
  }

  public get name(): 'Android' | 'iOS' | 'Server' | 'Web' {
    return device.os as any;
  }

  public get type(): 'Online' | 'Native' {
    return 'Native';
  }

  public constructor(
    private coreSettings: CoreSettings,
    router: Router,
    zone: NgZone
  ) {
    navigate = (url) => zone.run(() => router.navigateByUrl(url));

    this.connection.pipe(filter((state) => !state))
      .subscribe(() => router.navigate(['/', 'netsplit']));
  }

  public reload(): void {
    switch (this.name) {
      case 'Android': return this.engine.foregroundActivity.finish();
      case 'iOS': return;
    }
  }

  private online(type: connectionType): boolean {
    switch (type) {
      case connectionType.ethernet:
      case connectionType.mobile:
      case connectionType.wifi:
        return true;

      default:
      case connectionType.none:
        return false;
    }
  }

}
