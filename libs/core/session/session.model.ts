import { JSONSchema } from '@ngx-pwa/local-storage';

export class SessionModel {

  public static readonly schema: JSONSchema = {
    type: 'object',
    properties: {
      acceptCookies: { type: 'boolean' },
      language: { type: 'string' },
      likes: { type: 'array', items: { type: 'string' } }
    }
  };

  public acceptCookies: boolean = false;
  public language: string = 'en';
  public likes: string[] = [];

}
