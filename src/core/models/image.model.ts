import { ImageEntity } from '../../api/models/image-entity';
import { CrudModel } from '../crud/crud.model';

export class ImageModel
  extends CrudModel
  implements ImageEntity {

  public caption: string;
  public imageData: string;
  public mimeType: string;

  public get label(): string {
    return this.caption;
  }

  public get source(): string {
    return `url(data:${this.mimeType};base64,${this.imageData})`;
  }

}
