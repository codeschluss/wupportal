export class SessionModel {

  public static readonly schema = {
    properties: {
      isCookieAccepted: { type: 'boolean' },
      language: { type: 'string' },
      likes: { items: { type: 'string' } }
    }
  };

  public isCookieAccepted: boolean;
  public language: string = navigator.language.substr(0, 2);
  public likes: string[] = [];

}
