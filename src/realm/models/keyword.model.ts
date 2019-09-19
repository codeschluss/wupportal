
import { CrudModel } from '@wooportal/core';
import { TagEntity } from '../../api/models/tag-entity';
import { Translatable } from '../translations/translatable';

export class KeywordModel
  extends CrudModel implements TagEntity {

  @Translatable() public name: string;

  public description: string;

}
