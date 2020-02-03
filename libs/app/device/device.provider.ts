import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationSettings } from '../tools/settings';
import { DeviceProvider as Compat } from './device.provider.i';

@Injectable({ providedIn: 'root' })
export class DeviceProvider implements Compat {

  public get agent(): string {
    switch (this.notation) {
      case 'Server': return `${process.argv0} ${process.version}`;
      case 'Web': return this.frontend.userAgent;
    }
  }

  public get apparat(): string {
    switch (this.notation) {
      case 'Server': return `${process.platform} ${process.arch}`;
      case 'Web': return this.frontend.platform;
    }
  }

  public get connected(): boolean {
    switch (this.notation) {
      case 'Server': return true;
      case 'Web': return this.frontend.onLine;
    }
  }

  public get connection(): Observable<boolean> {
    return merge(
      fromEvent(this.document.defaultView, 'offline').pipe(map(() => false)),
      fromEvent(this.document.defaultView, 'online').pipe(map(() => true)),
      of(this.connected)
    );
  }

  public get document(): any {
    return this.dom;
  }

  public get frontend(): any {
    switch (this.notation) {
      // tslint:disable-next-line: deprecation
      case 'Server': return this.injector.get('express');
      case 'Web': return this.document.defaultView.navigator;
    }
  }

  public get language(): string {
    let language;

    switch (this.notation) {
      case 'Web':
        language = this.frontend.language;
        break;

      case 'Server':
        language = this.frontend.request.headers['accept-language'];
        break;
    }

    return language
      ? language.substr(0, 2)
      : this.app.config.defaults.language;
  }

  public get notation(): 'Android' | 'iOS' | 'Server' | 'Web' {
    switch (true) {
      case isPlatformBrowser(this.platformId): return 'Web';
      case isPlatformServer(this.platformId): return 'Server';
    }
  }

  public get platform(): 'Native' | 'Online' {
    return 'Online';
  }

  public get resizeClient(): (_: any) => void { return void 0; }

  public get resourceClient(): (_: any) => void { return void 0; }

  public get webViewClient(): any { return void 0; }

  public get webChromeClient(): any { return void 0; }

  public constructor(
    private app: ApplicationSettings,
    @Inject(DOCUMENT) private dom: Document,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  public reload(): void {
    this.document.defaultView.location.reload();
  }

}
