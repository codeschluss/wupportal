export class RefreshTokenModel {

  public static readonly schema = {
    properties: {
      exp: { type: 'integer' },
      raw: { type: 'string' },
      scopes: { items: { const: 'refresh' } },
      sub: { type: 'string' }
    }
  };

  public exp: number = 0;
  public raw: string = '';
  public scopes: string[] = ['refresh'];
  public sub: string = '';

}
