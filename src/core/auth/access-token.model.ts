import { JSONSchemaObject } from '@ngx-pwa/local-storage';

export class AccessTokenModel {

  public static readonly schema: JSONSchemaObject = {
    properties: {
      exp: { type: 'integer' },
      raw: { type: 'string' },
      scopes: { items: { const: 'access' } },
      sub: { type: 'string' },

      adminOrgas: { items: { type: 'string' } },
      approvedOrgas: { items: { type: 'string' } },
      createdActivities: { items: { type: 'string' } },
      superuser: { type: 'boolean' }
    }
  };

  public exp: number = 0;
  public raw: string = '';
  public scopes: string[] = ['access'];
  public sub: string = '';

  public adminOrgas: string[] = [];
  public approvedOrgas: string[] = [];
  public createdActivities: string[] = [];
  public superuser: boolean = false;

}
