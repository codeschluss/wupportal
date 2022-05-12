import { Observable } from 'rxjs';
import { MarkupEntity } from '../../api/models/markup-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';
import { ImageModel } from './image.model';
import { VideoModel } from './video.model';
import { VisitableModel } from './visitable.model';

export class StaticPageModel
  extends CrudModel
  implements MarkupEntity {

  @Translate() public content: string;
  @Translate() public title: string;

  public tagId: string;

  public images: ImageModel[] & Observable<ImageModel[]>;
  public titleImage: ImageModel & Observable<ImageModel>;
  public visitors: VisitableModel[] & Observable<VisitableModel[]>
  public videos: VideoModel[] & Observable<VideoModel[]>;


  public get label(): string | undefined {
    return this.title;
  }

  // compatability
  public get image() { return this.titleImage; }
  public set image(value) { this.titleImage = value; }

}
