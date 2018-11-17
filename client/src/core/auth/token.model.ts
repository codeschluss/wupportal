import { JSONSchemaObject } from '@ngx-pwa/local-storage';
import { BaseModel } from '../base/base.model';

export class TokenModel extends BaseModel {

  public sub: string;
  public exp: number;
  public superuser: boolean;

  public adminOrgas: string[];
  public approvedOrgas: string[];
  public createdActivities: string[];

  public static new = () => Object.assign(new TokenModel, {
    sub: '',
    exp: 0,
    superuser: false,

    adminOrgas: [],
    approvedOrgas: [],
    createdActivities: []
  })

}

export const TokenModelSchema = {
  properties: {
    sub: { type: 'string' },
    exp: { type: 'integer' },
    superuser: { type: 'boolean' },

    adminOrgas: { items: { type: 'string' } },
    approvedOrgas: { items: { type: 'string' } },
    createdActivities: { items: { type: 'string' } }
  }
} as JSONSchemaObject;
