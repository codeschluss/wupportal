import { TargetGroupEntity } from '../api/models/target-group-entity';
import { CrudModel } from '../crud/crud.model';

export class TargetGroupModel
  extends CrudModel implements TargetGroupEntity {

  public description: string;
  public name: string;

}
