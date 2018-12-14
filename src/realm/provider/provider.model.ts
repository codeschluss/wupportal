import { CrudModel } from '@portal/core';
import { ActivityModel } from '../activity/activity.model';
import { OrganisationModel } from '../organisation/organisation.model';

export class ProviderModel
  extends CrudModel {

  public admin: boolean;
  public approved: boolean;

  public activity: Promise<ActivityModel>;
  public organisation: Promise<OrganisationModel>;

}
