import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Title as TitleService } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoreSettings } from './settings';

@Injectable({ providedIn: 'root' })
export class Title {

  private title: BehaviorSubject<string>;

  private web: boolean;

  public get value(): Observable<string> {
    return this.title.asObservable();
  }

  public constructor(
    private coreSettings: CoreSettings,
    private titleService: TitleService,
    @Inject(PLATFORM_ID) platformId: any
  ) {
    this.title = new BehaviorSubject(this.coreSettings.title);
    this.web = isPlatformBrowser(platformId) || isPlatformServer(platformId);
  }

  public set(title?: string): void {
    title = title
      ? `${title} | ${this.coreSettings.title}`
      : this.coreSettings.title;

    this.title.next(title);

    if (this.web) {
      this.titleService.setTitle(title);
    }
  }

}
