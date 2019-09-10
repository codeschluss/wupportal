import { Injectable } from '@angular/core';
import { Title as TitleService } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlatformProvider } from '../platform/platform.provider';
import { CoreSettings } from './settings';

@Injectable({ providedIn: 'root' })
export class Title {

  private base: BehaviorSubject<string>;

  private title: BehaviorSubject<string>;

  public get name(): Observable<string> {
    return this.base.asObservable();
  }

  public get value(): Observable<string> {
    return this.title.asObservable();
  }

  public constructor(
    private coreSettings: CoreSettings,
    private platform: PlatformProvider,
    private titleService: TitleService
  ) {
    this.base = new BehaviorSubject<string>(this.coreSettings.defaultTitle);
    this.title = new BehaviorSubject<string>(this.base.value);
  }

  public set(title?: string): void {
    this.title.next(title ? `${title} | ${this.base.value}` : this.base.value);

    if (['Server', 'Web'].includes(this.platform.name)) {
      this.titleService.setTitle(this.title.value);
    }
  }

  public setBase(base: string): void {
    this.base.next(base);
  }

}
