import { TargetGroupEntity } from '../api/models/target-group-entity';
import { BaseModel } from '../base/base.model';

export class TargetGroupModel
  extends BaseModel implements TargetGroupEntity {

  public description: string;
  public name: string;

}
