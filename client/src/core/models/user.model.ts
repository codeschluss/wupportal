import { UserEntity } from '../api/models/user-entity';
import { CrudModel } from '../crud/crud.model';
import { ActivityModel } from './activity.model';
import { OrganisationModel } from './organisation.model';
import { ProviderModel } from './provider.model';

export class UserModel
  extends CrudModel implements UserEntity {

  public fullname: string;
  public password: string;
  public phone: string;
  public superuser: boolean;
  public username: string;

  public activities: Promise<ActivityModel[]>;
  public organisations: Promise<OrganisationModel[]>;
  public provider: Promise<ProviderModel>;

}
