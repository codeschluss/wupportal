import * as packageJson from '../package.json';

export class CorePackage {

  public static get author(): {
    name: string,
    email: string,
    url: string
  } {
    return packageJson.author;
  }

  public static get bugs(): {
    email: string,
    url: string
  } {
    return packageJson.bugs;
  }

  public static get repository(): {
    type: string,
    url: string
  } {
    return packageJson.repository;
  }

}
