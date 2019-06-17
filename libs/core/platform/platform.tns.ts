import { Injectable } from '@angular/core';
import { device } from 'tns-core-modules/platform';
import { Platform as Compat } from './platform.d';

@Injectable({ providedIn: 'root' })
export class Platform implements Compat {

  public get language(): string {
    return device.language;
  }

}
