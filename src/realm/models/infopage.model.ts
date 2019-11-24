import { CrudModel } from '@wooportal/core';
import { Observable } from 'rxjs';
import { PageEntity } from '../../api/models/page-entity';
import { Translatable } from '../translations/translatable';
import { TopicModel } from './topic.model';

export class InfopageModel
  extends CrudModel implements PageEntity {

  @Translatable() public content: string;
  @Translatable() public title: string;

  public likes: number;

  public topicId: string;

  public topic: TopicModel & Observable<TopicModel>;

  public get name(): string {
    return this.title;
  }

}
