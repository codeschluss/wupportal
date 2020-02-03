import { CrudModel, Translate } from '@wooportal/core';
import { TargetGroupEntity } from '../../api/models/target-group-entity';

export class TargetGroupModel
  extends CrudModel implements TargetGroupEntity {

  @Translate() public name: string;

  public description: string;

}
