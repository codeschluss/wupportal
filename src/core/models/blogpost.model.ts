import { Observable } from 'rxjs';
import { BlogEntity } from '../../api/models/blog-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';
import { BloggerModel } from './blogger.model';
import { ImageModel } from './image.model';
import { TopicModel } from './topic.model';
import { VisitableModel } from './visitable.model';

export class BlogpostModel
  extends CrudModel
  implements BlogEntity {

  @Translate() public content: string;
  @Translate() public title: string;

  public approved: boolean;
  public author: string;
  public likes: number;
  public mailAddress: string;

  public topicId: string;

  public blogger: BloggerModel & Observable<BloggerModel>;
  public images: ImageModel[] & Observable<ImageModel[]>;
  public titleImage: ImageModel & Observable<ImageModel>;
  public topic: TopicModel & Observable<TopicModel>;
  public visitors: VisitableModel[] & Observable<VisitableModel[]>

  public get label(): string {
    return this.title;
  }

  // compatability
  public get image() { return this.titleImage; }
  public set image(value) { this.titleImage = value; }

}
