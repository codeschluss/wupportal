export class SessionModel {

  public static readonly schema = {
    properties: {
      language: { type: 'string' },
      likes: { items: { type: 'string' } },
      cookiesAccepted: {type: 'boolean'}
    }
  };

  public language: string = navigator.language.substr(0, 2);
  public likes: string[] = [];
  public cookiesAccepted: boolean = false;

}
