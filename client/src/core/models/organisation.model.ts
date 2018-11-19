import { OrganisationEntity } from '../api/models/organisation-entity';
import { BaseModel } from '../base/base.model';
import { OrganisationProvider } from '../providers/organisation.provider';
import { ActivityModel } from './activity.model';
import { AddressModel } from './address.model';
import { UserModel } from './user.model';

export class OrganisationModel
  extends BaseModel implements OrganisationEntity {

  public provider = OrganisationProvider;

  public description: string;
  public image: any;
  public mail: string;
  public name: string;
  public phone: string;
  public website: string;

  public activities: Promise<ActivityModel[]>;
  public address: Promise<AddressModel>;
  public users: Promise<UserModel[]>;

}
