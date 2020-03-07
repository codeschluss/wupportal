import { JSONSchema } from '@ngx-pwa/local-storage';

export class SessionModel {

  public static readonly schema: JSONSchema = {
    type: 'object',
    properties: {
      followed: { type: 'array', items: { type: 'string' } },
      language: { type: 'string' },
      likes: { type: 'array', items: { type: 'string' } },
      subscriptionId: { type: 'string' }
    },
    required: [
      'followed',
      'language',
      'likes',
      'subscriptionId'
    ]
  };

  public followed: string[] = [];
  public language: string = null;
  public likes: string[] = [];
  public subscriptionId: string = '';

  public constructor(
    language: string = 'en'
  ) {
    this.language = language;
  }

}
