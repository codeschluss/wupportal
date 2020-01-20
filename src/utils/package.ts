import * as packageJson from '@wooportal/../../package.json';

export class ClientPackage {

  public static readonly author: {
    name: string,
    email: string,
    url: string
  } = packageJson.author;

  public static readonly bugs: {
    email: string,
    url: string
  } = packageJson.bugs;

  public static readonly config: {
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
    defaults: {
      appUrl: string,
      city: string,
      language: string,
      title: string
    }
  } = packageJson.config;

  public static readonly repository: {
    type: string,
    url: string
  } = packageJson.repository;

}
