import { TargetGroupEntity } from '../../api/models/target-group-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';

export class TargetGroupModel
  extends CrudModel
  implements TargetGroupEntity {

  @Translate() public name: string;

  public description: string;

}
