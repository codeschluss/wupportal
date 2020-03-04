import { CrudModel, Translate } from '@wooportal/core';
import { SubscriptionTypeEntity } from '../../api/models/subscription-type-entity';

export class SubscriptionTypeModel
  extends CrudModel implements SubscriptionTypeEntity {

  @Translate() public description: string;
  @Translate() public name: string;

}
