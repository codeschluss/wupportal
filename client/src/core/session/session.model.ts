import { JSONSchemaObject } from '@ngx-pwa/local-storage';
import { AccessTokenModel } from '../auth/access-token.model';
import { RefreshTokenModel } from '../auth/refresh-token.model';

export class SessionModel {

  public static readonly schema: JSONSchemaObject = {
    properties: {
      accessToken: AccessTokenModel.schema,
      refreshToken: RefreshTokenModel.schema,

      language: { type: 'string' },
      likes: { items: { type: 'string' } },
    }
  };

  public accessToken: AccessTokenModel = new AccessTokenModel();
  public refreshToken: RefreshTokenModel = new RefreshTokenModel();

  public language: string = navigator.language.substr(0, 2);
  public likes: string[] = [];

}
