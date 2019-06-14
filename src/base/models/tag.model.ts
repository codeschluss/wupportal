
import { CrudModel } from '@wooportal/core';
import { TagEntity } from '../../api/models/tag-entity';
import { Translatable } from '../translation.base';

export class TagModel
  extends CrudModel implements TagEntity {

  @Translatable() public name: string;

  public description: string;

}
