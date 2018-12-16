import { CrudModel } from '@portal/core';

export class ImageModel
  extends CrudModel {

  public caption: string;
  public image: string | Blob;
  public mimeType: string;

}
