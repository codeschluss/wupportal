import { SubscriptionTypeEntity } from '../../api/models/subscription-type-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';

export class SubscriptionTypeModel
  extends CrudModel
  implements SubscriptionTypeEntity {

  @Translate() public description: string;
  @Translate() public name: string;

}
