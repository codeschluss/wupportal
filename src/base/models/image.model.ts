import { fromBase64 } from '@wooportal/app';
import { CrudModel } from '@wooportal/core';
import { ImageEntity } from '../../api/models/image-entity';

export class ImageModel
  extends CrudModel implements ImageEntity {

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
