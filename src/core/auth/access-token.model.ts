import { JSONSchema } from '@ngx-pwa/local-storage';

export class AccessTokenModel {

  public static readonly schema: JSONSchema = {
    type: 'object',
    properties: {
      exp: { type: 'integer' },
      id: { type: 'string' },
      raw: { type: 'string' },
      scopes: {  type: 'array', items: { const: 'access', type: 'string' } },
      sub: { type: 'string' },

      adminOrgas: { type: 'array', items: { type: 'string' } },
      approvedOrgas: { type: 'array', items: { type: 'string' } },
      blogger: { type: 'boolean' },
      blogAuthor: { type: 'array', items: { type: 'string' } },
      createdActivities: { type: 'array', items: { type: 'string' } },
      superuser: { type: 'boolean' },
      translator: { type: 'boolean' }
    },
    required: [
      'exp',
      'id',
      'raw',
      'scopes',
      'sub',

      'adminOrgas',
      'approvedOrgas',
      'createdActivities',
      'superuser',
      'translator'
    ]
  };

  public exp: number = 0;
  public id: string = '';
  public raw: string = '';
  public scopes: string[] = ['access'];
  public sub: string = '';

  public adminOrgas: string[] = [];
  public blogger: boolean = false;
  public blogpostAuthor: string[] = [];
  public approvedOrgas: string[] = [];
  public createdActivities: string[] = [];
  public superuser: boolean = false;
  public translator: boolean = false;

}
