import { CrudModel } from '@portal/core';
import { UserEntity } from '../../api/models/user-entity';
import { ActivityModel } from '../activity/activity.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ProviderModel } from '../provider/provider.model';

export class UserModel
  extends CrudModel implements UserEntity {

  public name: string;
  public password: string;
  public phone: string;
  public superuser: boolean;
  public username: string;

  public activities: Promise<ActivityModel[]>;
  public organisations: Promise<OrganisationModel[]>;
  public provider: Promise<ProviderModel>;

}
