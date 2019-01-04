export class ClientPackage {

  private static packageJson: any = require('package.json');

  public static get bugs(): {
    email: string,
    url: string
  } {
    return this.packageJson.bugs;
  }

  public static get config(): {
    api: {
      rootUrl: string,
      authUrl: string,
      refreshUrl: string
    },
    jwtClaims: {
      activityProvider: string,
      organisationAdmin: string,
      organisationUser: string,
      superUser: string,
      userId: string
    },
    nominatim: {
      city: string,
      endpoint: string,
      params: string
    }
  } {
    return this.packageJson.config;
  }

  public static get repository(): {
    type: string,
    url: string
  } {
    return this.packageJson.repository;
  }

}
