import { CrudModel } from '@portal/core';
import { TargetGroupEntity } from '../../api/models/target-group-entity';

export class TargetGroupModel
  extends CrudModel implements TargetGroupEntity {

  public description: string;
  public name: string;

}
