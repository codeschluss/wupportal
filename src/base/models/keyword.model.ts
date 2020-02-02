
import { CrudModel, Translate } from '@wooportal/core';
import { TagEntity } from '../../api/models/tag-entity';

export class KeywordModel
  extends CrudModel implements TagEntity {

  @Translate() public name: string;

  public description: string;

}
