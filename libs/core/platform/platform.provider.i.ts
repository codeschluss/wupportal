export interface PlatformProvider {

  readonly engine: any;

  readonly language: string;

  readonly name: 'Android' | 'iOS' | 'Server' | 'Web';

  readonly type: 'Browser' | 'Native';

}
