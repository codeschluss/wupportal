import { CrudModel, Translate } from '@wooportal/core';
import { Observable } from 'rxjs';
import { TopicEntity } from '../../api/models/topic-entity';
import { InfopageModel } from './infopage.model';

export class TopicModel
  extends CrudModel implements TopicEntity {

  @Translate() public name: string;

  public infopages: InfopageModel[] & Observable<InfopageModel[]>;

  // compatability
  public get pages() { return this.infopages; }
  public set pages(value) { this.infopages = value; }

}
