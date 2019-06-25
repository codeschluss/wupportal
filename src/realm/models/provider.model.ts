import { CrudModel } from '@wooportal/core';
import { Observable } from 'rxjs';
import { ActivityModel } from './activity.model';
import { OrganisationModel } from './organisation.model';
import { UserModel } from './user.model';

export class ProviderModel
  extends CrudModel {

  public admin: boolean;
  public approved: boolean;

  public activities: ActivityModel[] & Observable<ActivityModel[]>;
  public organisation: OrganisationModel & Observable<OrganisationModel>;
  public user: UserModel & Observable<UserModel>;

  public get name(): string {
    return `${this.user.name} @ ${this.organisation.name}`;
  }

}
