import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';
import { android, ios } from 'tns-core-modules/application';
import { connectionType, getConnectionType, startMonitoring, stopMonitoring } from 'tns-core-modules/connectivity';
import { device } from 'tns-core-modules/platform';
import { CoreSettings } from '../utils/settings';
import { PlatformProvider as Compat } from './platform.provider.i';

@Injectable({ providedIn: 'root' })
export class PlatformProvider implements Compat {

  public get connected(): boolean {
    return this.online(getConnectionType());
  }

  public get connection(): Observable<boolean> {
    return new Observable((observer) => {
      startMonitoring((change) => observer.next(this.online(change)));
      return () => stopMonitoring();
    }).pipe(multicast(() => new ReplaySubject<boolean>(1)), refCount());
  }

  public get engine(): any {
    switch (this.name) {
      case 'Android': return android;
      case 'iOS': return ios;
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
    private coreSettings: CoreSettings
  ) { }

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
