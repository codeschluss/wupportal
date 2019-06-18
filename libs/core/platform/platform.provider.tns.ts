import { Injectable } from '@angular/core';
import { device } from 'tns-core-modules/platform';
import { PlatformProvider as Compat } from './platform.provider.d';

@Injectable({ providedIn: 'root' })
export class PlatformProvider implements Compat {

  public get engine(): any {
    return null;
  }

  public get language(): string {
    return device.language;
  }

  public get name(): 'Android' | 'iOS' | 'Server' | 'Web' {
    return device.os as any;
  }

}
