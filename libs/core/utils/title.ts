import { Injectable } from '@angular/core';
import { Title as TitleService } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlatformProvider } from '../platform/platform.provider';
import { CoreSettings } from './settings';

@Injectable({ providedIn: 'root' })
export class Title {

  private title: BehaviorSubject<string>;

  public get value(): Observable<string> {
    return this.title.asObservable();
  }

  public constructor(
    private coreSettings: CoreSettings,
    private platform: PlatformProvider,
    private titleService: TitleService
  ) {
    this.title = new BehaviorSubject(this.coreSettings.appTitle);
  }

  public set(title?: string): void {
    title = title
      ? `${title} | ${this.coreSettings.appTitle}`
      : this.coreSettings.appTitle;

    this.title.next(title);

    if (['Server', 'Web'].includes(this.platform.name)) {
      this.titleService.setTitle(title);
    }
  }

}
