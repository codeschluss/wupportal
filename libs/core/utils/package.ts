// TODO: https://github.com/angular/tsickle/pull/922
// import * as packageJson from '../package.json';
import * as packageJson from '@wooportal/core/package.json';

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
