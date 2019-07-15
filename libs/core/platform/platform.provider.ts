import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID, Type } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CoreSettings } from '../utils/settings';
import { PlatformProvider as Compat } from './platform.provider.i';

@Injectable({ providedIn: 'root' })
export class PlatformProvider implements Compat {

  public get connected(): boolean {
    switch (this.name) {
      case 'Server': return true;
      case 'Web': return navigator.onLine;
    }
  }

  public get connection(): Observable<boolean> {
    return merge(
      fromEvent(document, 'offline').pipe(map(() => false)),
      fromEvent(document, 'online').pipe(map(() => true)),
      startWith(this.connected)
    );
  }

  public get engine(): any {
    switch (this.name) {
      case 'Server': return this.injector.get('express' as any as Type<any>);
      default: return null;
    }
  }

  public get language(): string {
    let language;

    switch (this.name) {
      case 'Web':
        language = navigator.language;
        break;
      case 'Server':
        language = this.engine.request.headers['accept-language'];
        break;
    }

    return language
      ? language.substr(0, 2)
      : this.coreSettings.defaultLanguage;
  }

  public get name(): 'Android' | 'iOS' | 'Server' | 'Web' {
    switch (true) {
      case isPlatformBrowser(this.platformId): return 'Web';
      case isPlatformServer(this.platformId): return 'Server';
    }
  }

  public get type(): 'Online' | 'Native' {
    return 'Online';
  }

  public constructor(
    private coreSettings: CoreSettings,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

}
