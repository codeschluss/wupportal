export interface PlatformProvider {

  readonly connected: boolean;

  readonly engine: any;

  readonly language: string;

  readonly name: 'Android' | 'iOS' | 'Server' | 'Web';

  readonly type: 'Native' | 'Online';

}
