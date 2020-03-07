import { JSONSchema } from '@ngx-pwa/local-storage';

export class RefreshTokenModel {

  public static readonly schema: JSONSchema = {
    type: 'object',
    properties: {
      exp: { type: 'integer' },
      raw: { type: 'string' },
      scopes: { type: 'array', items: { type: 'string', const: 'refresh' } },
      sub: { type: 'string' }
    },
    required: [
      'exp',
      'raw',
      'scopes',
      'sub'
    ]
  };

  public exp: number = 0;
  public raw: string = '';
  public scopes: string[] = ['refresh'];
  public sub: string = '';

}
