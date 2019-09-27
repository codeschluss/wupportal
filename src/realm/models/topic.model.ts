import { CrudModel } from '@wooportal/core';
import { Observable } from 'rxjs';
import { TopicEntity } from '../../api/models/topic-entity';
import { Translatable } from '../translations/translatable';
import { InfopageModel } from './infopage.model';

export class TopicModel
  extends CrudModel implements TopicEntity {

  @Translatable() public name: string;

  public infopages: InfopageModel[] & Observable<InfopageModel[]>;

  public get pages() { return this.infopages; }
  public set pages(value) { this.infopages = value; }

}
