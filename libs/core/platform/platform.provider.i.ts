import { Observable } from 'rxjs';

export interface PlatformProvider {

  readonly chromeClient: any;

  readonly connected: boolean;

  readonly connection: Observable<boolean>;

  readonly engine: any;

  readonly language: string;

  readonly name: 'Android' | 'iOS' | 'Server' | 'Web';

  readonly type: 'Native' | 'Online';

  readonly viewClient: any;

  reload(): void;

}
