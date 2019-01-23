import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { ActivityEntity } from '../../api/models/activity-entity';
import { AddressModel } from '../address/address.model';
import { BlogModel } from '../blog/blog.model';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ProviderModel } from '../provider/provider.model';
import { ScheduleModel } from '../schedule/schedule.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';
import { Translatable } from '../translation/translation.base';

export class ActivityModel
  extends CrudModel implements ActivityEntity {

  @Translatable() public description: string;
  @Translatable() public name: string;

  public contactName: string;
  public mail: string;
  public phone: string;

  public addressId: string;
  public categoryId: string;
  public organisationId: string;

  public address: AddressModel & Observable<AddressModel>;
  public category: CategoryModel & Observable<CategoryModel>;
  public organisation: OrganisationModel & Observable<OrganisationModel>;
  public provider: ProviderModel & Observable<ProviderModel>;
  public schedules: ScheduleModel[] & Observable<ScheduleModel[]>;
  public tags: TagModel[] & Observable<TagModel[]>;
  public blogs: BlogModel[] & Observable<BlogModel[]>;
  public targetGroups: TargetGroupModel[] & Observable<TargetGroupModel[]>;

}
