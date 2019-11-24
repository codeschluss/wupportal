import { CrudModel } from '@wooportal/core';
import { Observable } from 'rxjs';
import { OrganisationEntity } from '../../api/models/organisation-entity';
import { Translatable } from '../translations/translatable';
import { ActivityModel } from './activity.model';
import { AddressModel } from './address.model';
import { ImageModel } from './image.model';
import { MembershipModel } from './membership.model';
import { UserModel } from './user.model';

export class OrganisationModel
  extends CrudModel implements OrganisationEntity {

  @Translatable() public description: string;

  public approved: boolean;
  public likes: number;
  public mail: string;
  public name: string;
  public phone: string;
  public videoUrl: string;
  public website: string;

  public addressId: string;

  public activities: ActivityModel[] & Observable<ActivityModel[]>;
  public address: AddressModel & Observable<AddressModel>;
  public images: ImageModel[] & Observable<ImageModel[]>;
  public membership: MembershipModel & Observable<MembershipModel>;
  public memberships: MembershipModel[] & Observable<MembershipModel[]>;
  public users: UserModel[] & Observable<UserModel[]>;

  // compatability
  public get provider() { return this.membership; }
  public set provider(value) { this.membership = value; }
  public get providers() { return this.memberships; }
  public set providers(value) { this.memberships = value; }

}
