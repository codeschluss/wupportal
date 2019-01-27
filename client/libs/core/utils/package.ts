export class CorePackage {

  private static packageJson: any = require('libs/core/package.json');

  public static get bugs(): {
    email: string,
    url: string
  } {
    return this.packageJson.bugs;
  }

  public static get repository(): {
    type: string,
    url: string
  } {
    return this.packageJson.repository;
  }

}
