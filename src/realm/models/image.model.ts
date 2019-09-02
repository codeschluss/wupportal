import { CrudModel, fromBase64 } from '@wooportal/core';

export class ImageModel
  extends CrudModel {

  public caption: string;
  public imageData: string;
  public mimeType: string;

  public get source(): string {
    return `url(data:${this.mimeType};base64,${this.imageData})`;
  }

  public get nativeSource(): any {
    return fromBase64(this.imageData);
  }

}
