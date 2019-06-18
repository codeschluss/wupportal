import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { Platform as Compat } from './platform.d';

@Injectable({ providedIn: 'root' })
export class Platform implements Compat {

  public get language(): string {
    switch (this.name) {
      case 'Web':
        return navigator.language.substr(0, 2);

      case 'Server':
        const request = this.injector.get('express').request;
        return request.headers['accept-language'].substr(0, 2);
    }
  }

  public get name(): 'Android' | 'iOS' | 'Server' | 'Web' {
    switch (true) {
      case isPlatformBrowser(this.platformId): return 'Web';
      case isPlatformServer(this.platformId): return 'Server';
    }
  }

  public constructor(
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

}
