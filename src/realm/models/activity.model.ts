import { CrudModel } from '@wooportal/core';
import { Observable } from 'rxjs';
import { ActivityEntity } from '../../api/models/activity-entity';
import { AddressModel } from '../models/address.model';
import { Translatable } from '../translations/translatable';
import { BlogModel } from './blog.model';
import { CategoryModel } from './category.model';
import { OrganisationModel } from './organisation.model';
import { ProviderModel } from './provider.model';
import { ScheduleModel } from './schedule.model';
import { TagModel } from './tag.model';
import { TargetGroupModel } from './target-group.model';

export class ActivityModel
  extends CrudModel implements ActivityEntity {

  @Translatable() public description: string;
  @Translatable() public name: string;

  public contactName: string;
  public likes: number;
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
