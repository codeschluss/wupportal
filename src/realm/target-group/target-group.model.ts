import { CrudModel } from '@portal/core';
import { TargetGroupEntity } from '../../api/models/target-group-entity';
import { Translatable } from '../translation/translation.base';

export class TargetGroupModel
  extends CrudModel implements TargetGroupEntity {

  @Translatable() public name: string;

  public description: string;

}
