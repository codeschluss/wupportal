import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { PageEntity } from 'src/api/models/page-entity';
import { TopicModel } from '../topic/topic.model';
import { Translatable } from '../translation/translation.base';

export class PageModel
  extends CrudModel implements PageEntity {

  @Translatable() public content: string;
  @Translatable() public title: string;

  public topicId: string;

  public topic: TopicModel & Observable<TopicModel>;

}
