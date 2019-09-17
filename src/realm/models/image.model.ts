import { CrudModel } from '@wooportal/core';
import { fromBase64 } from '../../views/shared/shared.imports';

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
