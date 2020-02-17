import { Observable } from 'rxjs';

export interface DeviceProvider {

  readonly agent: string;

  readonly apparat: string;

  readonly connected: boolean;

  readonly connection: Observable<boolean>;

  readonly document: any;

  readonly frontend: any;

  readonly language: string;

  readonly notation: 'Android' | 'Browser' | 'iOS' | 'Server';

  readonly platform: 'Native' | 'Online';

  readonly resizeClient: (event: any) => void;

  readonly resourceClient: (event: any) => void;

  readonly webChromeClient: any;

  readonly webViewClient: any;

  reload(): void;

}
