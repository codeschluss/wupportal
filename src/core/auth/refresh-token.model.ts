import { JSONSchemaObject } from '@ngx-pwa/local-storage';
import { TokenModel } from './token.service';

export class AccessTokenModel implements TokenModel {

  public static readonly schema: JSONSchemaObject = {
    properties: {
      sub: { type: 'string' },
      exp: { type: 'integer' },
      scopes: { items: { type: 'string' } }
    }
  };

  public sub: string = '';
  public exp: number = 0;
  public scopes: string[] = ['refresh'];

}
