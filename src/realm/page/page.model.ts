import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { PageEntity } from 'src/api/models/page-entity';
import { TopicModel } from '../topic/topic.model';

export class PageModel
  extends CrudModel implements PageEntity {

  public content: string;
  public title: string;

  public topicId: string;

  public topic: TopicModel & Observable<TopicModel>;

}
