import * as manifestJson from '../../manifest.json';

export class ClientManifest {

  public static get description(): string {
    return manifestJson.description;
  }

  public static get shortTitle(): string {
    return manifestJson.short_name;
  }

  public static get startUrl(): string {
    return manifestJson.start_url;
  }

  public static get title(): string {
    return manifestJson.name;
  }

}
