import { CrudModel } from '@portal/core';

export class ImageModel
  extends CrudModel {

  public caption: string;
  public imageData: string | Blob;
  public mimeType: string;

}
