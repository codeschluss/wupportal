import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';
import { android as androidApp, ios as iosApp } from 'tns-core-modules/application';
import { connectionType, getConnectionType, startMonitoring, stopMonitoring } from 'tns-core-modules/connectivity';
import { device } from 'tns-core-modules/platform';
import { openUrl } from 'tns-core-modules/utils/utils';
import { ApplicationSettings } from '../tools/settings';
import { DeviceProvider as Compat } from './device.provider.i';

declare const android: any;
declare const exit: (code: number) => void;
declare const NSDate: any;
declare const WKWebsiteDataStore: any;

@Injectable({ providedIn: 'root' })
export class DeviceProvider implements Compat {

  private static navigate: (url: string) => Promise<boolean>;

  private static resizeClient: (event: any) => void;

  private static resourceClient: (event: any) => void;

  private static webChromeClient: any;

  private static webViewClient: any;

  public get agent(): string {
    return `${device.os} ${device.osVersion}`;
  }

  public get apparat(): string {
    return `${device.manufacturer} ${device.model}`;
  }

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

  public get document(): any {
    return this.frontend.nativeApp;
  }

  public get frontend(): any {
    switch (this.notation) {
      case 'Android': return androidApp;
      case 'iOS': return iosApp;
    }
  }

  public get language(): string {
    return device.language.substr(0, 2) || this.app.config.defaults.language;
  }

  public get notation(): 'Android' | 'iOS' | 'Server' | 'Web' {
    return device.os as any;
  }

  public get platform(): 'Native' | 'Online' {
    return 'Native';
  }

  public get resizeClient(): (event: any) => void {
    return DeviceProvider.resizeClient;
  }

  public get resourceClient(): (event: any) => void {
    return DeviceProvider.resourceClient;
  }

  public get webViewClient(): any {
    return DeviceProvider.webViewClient;
  }

  public get webChromeClient(): any {
    return DeviceProvider.webChromeClient;
  }

  public constructor(
    private app: ApplicationSettings,
    router: Router,
    zone: NgZone
  ) {
    DeviceProvider.navigate = (url) =>
      zone.run(() => router.navigateByUrl(url));

    switch (this.notation) {
      case 'Android':
        DeviceProvider.webChromeClient = android.webkit.WebChromeClient.extend({
          onGeolocationPermissionsShowPrompt: (url: string, callback: any) => {
            if (url.startsWith(this.app.config.defaults.appUrl)) {
              callback.invoke(url, true, false);
            }
          }
        });

        DeviceProvider.webViewClient = android.webkit.WebViewClient.extend({
          shouldOverrideUrlLoading: (_: any, url: any) => {
            url = typeof url === 'string' ? url : url.getUrl().toString();

            if (url.startsWith(this.app.config.defaults.appUrl)) {
              url = url.replace(this.app.config.defaults.appUrl, '');
              DeviceProvider.navigate(url);
            } else {
              openUrl(url);
            }

            return true;
          }
        });
        break;

      case 'iOS':
        DeviceProvider.resizeClient = (event) => {
          event.object.ios.scrollView.scrollEnabled = false;
          event.object.ios.evaluateJavaScriptCompletionHandler(
            'document.body.scrollHeight',
            (height) => event.object.height = height
          );
        };

        DeviceProvider.resourceClient = (event) => {
          if (event.url.startsWith(this.app.config.defaults.appUrl)) {
            const url = event.url.replace(this.app.config.defaults.appUrl, '');
            DeviceProvider.navigate(url);
          } else {
            openUrl(event.url);
          }
        };
        break;
    }
  }

  public reload(): void {
    switch (this.notation) {
      case 'Android':
        android.webkit.WebStorage.getInstance().deleteAllData();
        this.frontend.foregroundActivity.finish();
        break;

      case 'iOS':
        const store = WKWebsiteDataStore.defaultDataStore();
        store.removeDataOfTypesModifiedSinceCompletionHandler(
          WKWebsiteDataStore.allWebsiteDataTypes(),
          NSDate.dateWithTimeIntervalSince1970(0),
          () => { }
        );
        exit(0);
        break;
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
