import { Injectable } from '@angular/core';
import { connectionType, getConnectionType } from 'tns-core-modules/connectivity';
import { device } from 'tns-core-modules/platform';
import { PlatformProvider as Compat } from './platform.provider.i';

@Injectable({ providedIn: 'root' })
export class PlatformProvider implements Compat {

  public get connected(): boolean {
    switch (getConnectionType()) {
      case connectionType.ethernet:
      case connectionType.mobile:
      case connectionType.wifi:
        return true;
      default:
      case connectionType.none:
        return false;
    }
  }

  public get engine(): any {
    return null;
  }

  public get language(): string {
    return device.language;
  }

  public get name(): 'Android' | 'iOS' | 'Server' | 'Web' {
    return device.os as any;
  }

  public get type(): 'Online' | 'Native' {
    return 'Native';
  }

}
