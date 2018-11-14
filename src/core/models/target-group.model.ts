import { TargetGroupEntity } from '../api/models/target-group-entity';
import { AbstractModel } from './abstract.model';

export class TargetGroupModel extends AbstractModel
  implements TargetGroupEntity {

  public description: string;
  public name: string;

}
