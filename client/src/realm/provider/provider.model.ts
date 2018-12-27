import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { ActivityModel } from '../activity/activity.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { UserModel } from '../user/user.model';

export class ProviderModel
  extends CrudModel {

  public admin: boolean;
  public approved: boolean;

  public activities: Observable<ActivityModel[]>;
  public organisation: Observable<OrganisationModel>;
  public user: Observable<UserModel>;

}
