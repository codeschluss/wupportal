
import { CrudModel } from '@portal/core';
import { TagEntity } from '../../api/models/tag-entity';
import { Translatable } from '../translation/translation.base';

export class TagModel
  extends CrudModel implements TagEntity {

  @Translatable() public description: string;
  @Translatable() public name: string;

}
