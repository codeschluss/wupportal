import { Observable } from 'rxjs';
import { OrganisationEntity } from '../../api/models/organisation-entity';
import { CrudModel } from '../crud/crud.model';
import { Translate } from '../crud/crud.translate';
import { ActivityModel } from './activity.model';
import { AddressModel } from './address.model';
import { ImageModel } from './image.model';
import { MembershipModel } from './membership.model';
import { UserModel } from './user.model';
import { VideoModel } from './video.model';
import { VisitableModel } from './visitable.model';

export class OrganisationModel
  extends CrudModel
  implements OrganisationEntity {

  @Translate() public description: string;

  public approved: boolean;
  public likes: number;
  public mail: string;
  public name: string;
  public phone: string;
  public website: string;

  public addressId: string;

  public activities: ActivityModel[] & Observable<ActivityModel[]>;
  public address: AddressModel & Observable<AddressModel>;
  public avatar: ImageModel & Observable<ImageModel>;
  public images: ImageModel[] & Observable<ImageModel[]>;
  public membership: MembershipModel & Observable<MembershipModel>;
  public memberships: MembershipModel[] & Observable<MembershipModel[]>;
  public users: UserModel[] & Observable<UserModel[]>;
  public videos: VideoModel[] & Observable<VideoModel[]>;
  public visitors: VisitableModel[] & Observable<VisitableModel[]>

  // compatability
  public get image() { return this.avatar; }
  public set image(value) { this.avatar = value; }
  public get provider() { return this.membership; }
  public set provider(value) { this.membership = value; }
  public get providers() { return this.memberships; }
  public set providers(value) { this.memberships = value; }

}
