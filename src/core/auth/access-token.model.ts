import { JSONSchemaObject } from '@ngx-pwa/local-storage';
import { TokenModel } from './token.service';

export class AccessTokenModel implements TokenModel {

  public static readonly schema: JSONSchemaObject = {
    properties: {
      sub: { type: 'string' },
      exp: { type: 'integer' },
      scopes: { items: { type: 'string' } },

      adminOrgas: { items: { type: 'string' } },
      approvedOrgas: { items: { type: 'string' } },
      createdActivities: { items: { type: 'string' } },
      superuser: { type: 'boolean' }
    }
  };

  public sub: string = '';
  public exp: number = 0;
  public scopes: string[] = ['access'];

  public adminOrgas: string[] = [];
  public approvedOrgas: string[] = [];
  public createdActivities: string[] = [];
  public superuser: boolean = false;

}
