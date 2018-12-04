import { CrudModel } from '@portal/core';
import { OrganisationEntity } from '../../api/models/organisation-entity';
import { ActivityModel } from '../activity/activity.model';
import { AddressModel } from '../address/address.model';
import { ProviderModel } from '../provider/provider.model';
import { UserModel } from '../user/user.model';

export class OrganisationModel
  extends CrudModel implements OrganisationEntity {

  public description: string;
  public image: any;
  public mail: string;
  public name: string;
  public phone: string;
  public website: string;

  public activities: Promise<ActivityModel[]>;
  public address: Promise<AddressModel>;
  public provider: Promise<ProviderModel>;
  public users: Promise<UserModel[]>;

}
