import { CrudModel } from '@wooportal/core';

export class ImageModel
  extends CrudModel {

  public caption: string;
  public imageData: string | Blob;
  public mimeType: string;

}
