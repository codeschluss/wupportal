import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
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
  public applyBlogger: boolean;

  public activities: Observable<ActivityModel[]>;
  public organisations: Observable<OrganisationModel[]>;
  public provider: Observable<ProviderModel>;

}
