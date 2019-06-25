import * as manifestJson from '../../manifest.json';

export class ClientManifest {

  public static readonly description: string = manifestJson.description;

  public static readonly shortTitle: string = manifestJson.short_name;

  public static readonly startUrl: string = manifestJson.start_url;

  public static readonly title: string = manifestJson.name;

}
