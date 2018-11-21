import { JSONSchemaObject } from '@ngx-pwa/local-storage';
import { AccessTokenModel } from '../auth/access-token.model';

export class SessionModel {

  public static readonly schema: JSONSchemaObject = {
    properties: {
      bearer: { type: 'string' },
      language: { type: 'string' },
      likes: { items: { type: 'string' } },
      token: AccessTokenModel.schema
    }
  };

  public bearer: string = '';
  public language: string = navigator.language.substr(0, 2);
  public likes: string[] = [];
  public token: AccessTokenModel = new AccessTokenModel();

}
