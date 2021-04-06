import { Observable } from 'rxjs';
import { CrudModel } from '../crud/crud.model';
import { ActivityModel } from './activity.model';
import { OrganisationModel } from './organisation.model';
import { UserModel } from './user.model';

export class MembershipModel
  extends CrudModel {

  public approved: boolean;
  public ownership: boolean;

  public activities: ActivityModel[] & Observable<ActivityModel[]>;
  public organisation: OrganisationModel & Observable<OrganisationModel>;
  public user: UserModel & Observable<UserModel>;

  public get label(): string {
    return `${this.user.label} @ ${this.organisation.label}`;
  }

  // compatability
  public get admin() { return this.ownership; }
  public set admin(value) { this.ownership = value; }

}
