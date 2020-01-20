import * as packageJson from '@wooportal/editor/package.json';

export class EditorPackage {

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
    language: string,
    toolbar: object,
    [key: string]: any
  } = packageJson.config;

  public static readonly repository: {
    type: string,
    url: string
  } = packageJson.repository;

}
