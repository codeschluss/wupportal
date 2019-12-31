import { Observable } from 'rxjs';

export interface PlatformProvider {

  readonly chromeClient: any;

  readonly connected: boolean;

  readonly connection: Observable<boolean>;

  readonly engine: any;

  readonly language: string;

  readonly name: 'Android' | 'iOS' | 'Server' | 'Web';

  readonly platform: string;

  readonly type: 'Native' | 'Online';

  readonly userAgent: string;

  readonly viewClient: any;

  reload(): void;

  resizeClient(event: any): void;

  resourceClient(event: any): void;

}
