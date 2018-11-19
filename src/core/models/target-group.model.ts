import { TargetGroupEntity } from '../api/models/target-group-entity';
import { BaseModel } from '../base/base.model';
import { TargetGroupProvider } from '../providers/target-group.provider';

export class TargetGroupModel
  extends BaseModel implements TargetGroupEntity {

  public provider = TargetGroupProvider;

  public description: string;
  public name: string;

}
