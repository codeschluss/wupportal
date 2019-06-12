import * as packageJson from '../../package.json';

export class ClientPackage {

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
    position: {
      city: string
    },
    translations: {
      defaultLocale: string
    }
  } {
    return packageJson.config;
  }

  public static get repository(): {
    type: string,
    url: string
  } {
    return packageJson.repository;
  }

}
