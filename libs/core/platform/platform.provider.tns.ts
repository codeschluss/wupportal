import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';
import { connectionType, getConnectionType, startMonitoring, stopMonitoring } from 'tns-core-modules/connectivity';
import { device } from 'tns-core-modules/platform';
import { CoreSettings } from '../utils/settings';
import { PlatformProvider as Compat } from './platform.provider.i';

@Injectable({ providedIn: 'root' })
export class PlatformProvider implements Compat {

  public get connected(): boolean {
    return this.connectionTypeMap(getConnectionType());
  }

  public get connection(): Observable<boolean> {
    return new Observable((watch) => {
      startMonitoring((change) => watch.next(this.connectionTypeMap(change)));
      return () => stopMonitoring();
    }).pipe(publish(), refCount());
  }

  public get engine(): any {
    return null;
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

  private connectionTypeMap(type: connectionType): boolean {
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
