import { Observable } from 'rxjs';
import { VideoEntity } from '../../api/models/video-entity';
import { CrudModel } from '../crud/crud.model';
import { ImageModel } from './image.model';

export class VideoModel
  extends CrudModel
  implements VideoEntity {

  public url: string;

  public thumbnailCaption?: string;
  public thumbnailUrl?: string;

  public thumbnail: ImageModel & Observable<ImageModel>;

  public get label(): string {
    return this.thumbnail
      ? this.thumbnail.label
      : this.url;
  }

}
