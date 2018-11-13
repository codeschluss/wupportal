import { ResourceTargetGroupEntity } from '../api/models/resource-target-group-entity';
import { AbstractEntity } from './abstract.entity';

export class TargetGroupEntity extends AbstractEntity
  implements ResourceTargetGroupEntity {

  public description: string;
  public name: string;

}
