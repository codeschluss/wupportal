export class SessionModel {

  public static readonly schema = {
    properties: {
      language: { type: 'string' },
      likes: { items: { type: 'string' } },
    }
  };

  public language: string = navigator.language.substr(0, 2);
  public likes: string[] = [];

}
