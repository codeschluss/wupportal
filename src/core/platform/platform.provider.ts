import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { Request, Response } from 'express';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreSettings } from '../tools/settings';

@Injectable({
  providedIn: 'root'
})

export class PlatformProvider {

  public get connected(): boolean {
    return this.name === 'server' || this.navigator.onLine;
  }

  public get connection(): Observable<boolean> {
    return merge(
      fromEvent(this.document, 'offline').pipe(map(() => false)),
      fromEvent(this.document, 'online').pipe(map(() => true)),
      of(this.connected)
    );
  }

  public get language(): string {
    if (this.name !== 'server') {
      return (
        this.navigator.language ||
        this.settings.defaults.language
      ).substr(0, 2);
    }

    return (
      this.request.headers.cookie?.match(/lang=([a-z]{2})/)?.[1] ||
      this.request.headers[this.settings.labelHeader.read] as string ||
      this.settings.defaults.language
    ).substr(0, 2);
  }

  public get name(): 'android' | 'browser' | 'ios' | 'server' {
    return isPlatformServer(this.platformId)
      ? 'server' : device.platform.toLowerCase() as any;
  }

  public get navigator(): Navigator {
    return this.document.defaultView.navigator;
  }

  public get reload(): Function {
    return () => {
      if (['android', 'ios'].includes(this.name)) {
        this.navigator.splashscreen.show();
      }

      this.document.defaultView.location.reload();
    };
  }

  public get userAgent(): string {
    if (this.name === 'server') {
      return `${process.argv0} ${process.version}`;
    }

    const { manufacturer, model, platform, version } = device;
    return `${manufacturer || platform} ${model} ${version}`;
  }

  public constructor(
    @Inject(DOCUMENT) public document: Document,
    @Inject(PLATFORM_ID) public platformId: object,
    @Optional() @Inject(REQUEST) public request: Request,
    @Optional() @Inject(RESPONSE) public response: Response,
    private settings: CoreSettings
  ) { }

}
