import { JSONSchema } from '@ngx-pwa/local-storage';

export class SessionModel {

  public static readonly schema: JSONSchema = {
    type: 'object',
    properties: {
      language: { type: 'string' },
      likes: { type: 'array', items: { type: 'string' } }
    }
  };

  public language: string = null;
  public likes: string[] = [];

  public constructor(
    language: string = 'en'
  ) {
    this.language = language;
  }

}
