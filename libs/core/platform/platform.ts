import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { Platform as Compat } from './platform.d';

@Injectable({ providedIn: 'root' })
export class Platform implements Compat {

  public get language(): string {
    switch (true) {
      case isPlatformBrowser(this.platformId):
        return navigator.language.substr(0, 2);

      case isPlatformServer(this.platformId):
        const request = this.injector.get('express').request;
        return request.headers['accept-language'].substr(0, 2);
    }
  }

  public constructor(
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

}
