import { Observable } from 'rxjs';
import { BlogpostModel } from '..';
import { TopicEntity } from '../../api/models/topic-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';

export class TopicModel
  extends CrudModel
  implements TopicEntity {

  @Translate() public name: string;

  public blogposts: BlogpostModel[] & Observable<BlogpostModel[]>;

  // compatability
  public get blogs() { return this.blogposts; }
  public set blogs(value) { this.blogposts = value; }

}
