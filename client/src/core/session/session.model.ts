import { JSONSchemaObject } from '@ngx-pwa/local-storage';
import { TokenModel, TokenModelSchema } from '../auth/token.model';
import { BaseModel } from '../base/base.model';

export class SessionModel extends BaseModel {

  public bearer: string;
  public language: string;
  public likes: string[];
  public token: TokenModel;

  public static new = () => Object.assign(new SessionModel, {
    bearer: '',
    language: navigator.language.substr(0, 2),
    likes: [],
    token: TokenModel.new()
  })

}

export const SessionModelSchema = {
  properties: {
    bearer: { type: 'string' },
    language: { type: 'string' },
    likes: { items: { type: 'string' } },
    token: TokenModelSchema
  }
} as JSONSchemaObject;
