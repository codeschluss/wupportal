import { Observable } from 'rxjs';
import { BlogEntity } from '../../api/models/blog-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';
import { ActivityModel } from './activity.model';
import { BloggerModel } from './blogger.model';
import { ImageModel } from './image.model';

export class BlogpostModel
  extends CrudModel
  implements BlogEntity {

  @Translate() public content: string;
  @Translate() public title: string;

  public author: string;
  public likes: number;

  public activityId: string;

  public activity: ActivityModel & Observable<ActivityModel>;
  public blogger: BloggerModel & Observable<BloggerModel>;
  public images: ImageModel[] & Observable<ImageModel[]>;

  public get label(): string {
    return this.title;
  }

}
