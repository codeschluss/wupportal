import { Observable } from 'rxjs';
import { PageEntity } from '../../api/models/page-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';
import { TopicModel } from './topic.model';

export class InfopageModel
  extends CrudModel
  implements PageEntity {

  @Translate() public content: string;
  @Translate() public title: string;

  public likes: number;

  public topicId: string;

  public topic: TopicModel & Observable<TopicModel>;

  public get label(): string {
    return this.title;
  }

}
