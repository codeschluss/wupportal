export class SessionModel {

  public static readonly schema = {
    properties: {
      acceptCookies: { type: 'boolean' },
      language: { type: 'string' },
      likes: { items: { type: 'string' } }
    }
  };

  public acceptCookies: boolean = false;
  public language: string = navigator.language.substr(0, 2);
  public likes: string[] = [];

}
