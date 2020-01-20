import * as packageJson from '@wooportal/core/package.json';

export class CorePackage {

  public static readonly author: {
    name: string,
    email: string,
    url: string
  } = packageJson.author;

  public static readonly bugs: {
    email: string,
    url: string
  } = packageJson.bugs;

  public static readonly repository: {
    type: string,
    url: string
  } = packageJson.repository;

}
