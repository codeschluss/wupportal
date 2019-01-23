import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { OrganisationEntity } from '../../api/models/organisation-entity';
import { ActivityModel } from '../activity/activity.model';
import { AddressModel } from '../address/address.model';
import { ImageModel } from '../image/image.model';
import { ProviderModel } from '../provider/provider.model';
import { Translatable } from '../translation/translation.base';
import { UserModel } from '../user/user.model';

export class OrganisationModel
  extends CrudModel implements OrganisationEntity {

  @Translatable() public description: string;

  public approved: boolean;
  public mail: string;
  public name: string;
  public phone: string;
  public videoUrl: string;
  public website: string;

  public addressId: string;

  public activities: ActivityModel[] & Observable<ActivityModel[]>;
  public address: AddressModel & Observable<AddressModel>;
  public images: ImageModel[] & Observable<ImageModel[]>;
  public provider: ProviderModel & Observable<ProviderModel>;
  public users: UserModel[] & Observable<UserModel[]>;

}
