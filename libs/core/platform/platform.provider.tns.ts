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
declare const exit: (code: number) => void;
declare const NSDate: any;
declare const WKWebsiteDataStore: any;

@Injectable({ providedIn: 'root' })
export class PlatformProvider implements Compat {

  private static navigate: (url: string) => Promise<boolean>;

  private static resizeClient: (event: any) => void;

  private static resourceClient: (event: any) => void;

  private static chromeClient: any;

  private static viewClient: any;

  public get chromeClient(): any {
    return PlatformProvider.chromeClient;
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

  public get engine(): any {
    switch (this.name) {
      case 'Android': return androidApp;
      case 'iOS': return iosApp;
    }
  }

  public get language(): string {
    return device.language.substr(0, 2) || this.coreSettings.defaultLanguage;
  }

  public get name(): 'Android' | 'iOS' | 'Server' | 'Web' {
    return device.os as any;
  }

  public get platform(): string {
    return `${device.manufacturer} ${device.model}`;
  }

  public get type(): 'Online' | 'Native' {
    return 'Native';
  }

  public get userAgent(): string {
    return `${device.os} ${device.osVersion}`;
  }

  public get viewClient(): any {
    return PlatformProvider.viewClient;
  }

  public constructor(
    private coreSettings: CoreSettings,
    router: Router,
    zone: NgZone
  ) {
    PlatformProvider.navigate = (url) =>
      zone.run(() => router.navigateByUrl(url));

    this.connection.pipe(filter((state) => !state))
      .subscribe(() => router.navigate(['/', 'netsplit']));

    switch (this.name) {
      case 'Android':
        PlatformProvider.chromeClient = android.webkit.WebChromeClient.extend({
          onGeolocationPermissionsShowPrompt: (url: string, callback: any) => {
            if (url.startsWith(this.coreSettings.appUrl)) {
              callback.invoke(url, true, false);
            }
          }
        });

        PlatformProvider.viewClient = android.webkit.WebViewClient.extend({
          shouldOverrideUrlLoading: (_: any, url: any) => {
            url = typeof url === 'string' ? url : url.getUrl().toString();

            if (url.startsWith(this.coreSettings.appUrl)) {
              url = url.replace(this.coreSettings.appUrl, '');
              PlatformProvider.navigate(url);
            } else {
              openUrl(url);
            }

            return true;
          }
        });
        break;

      case 'iOS':
        PlatformProvider.resizeClient = (event) => {
          event.object.ios.scrollView.scrollEnabled = false;
          event.object.ios.evaluateJavaScriptCompletionHandler(
            'document.body.scrollHeight',
            (height) => event.object.height = height
          );
        };

        PlatformProvider.resourceClient = (event) => {
          if (event.url.startsWith(this.coreSettings.appUrl)) {
            const url = event.url.replace(this.coreSettings.appUrl, '');
            PlatformProvider.navigate(url);
          } else {
            openUrl(event.url);
          }
        };
        break;
    }
  }

  public reload(): void {
    switch (this.name) {
      case 'Android':
        android.webkit.WebStorage.getInstance().deleteAllData();
        this.engine.foregroundActivity.finish();
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

  public resizeClient(event: any): void {
    PlatformProvider.resizeClient(event);
  }

  public resourceClient(event: any): void {
    PlatformProvider.resourceClient(event);
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
