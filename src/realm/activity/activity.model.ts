import { CrudModel } from '@portal/core';
import { Observable } from 'rxjs';
import { ActivityEntity } from '../../api/models/activity-entity';
import { AddressModel } from '../address/address.model';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ScheduleModel } from '../schedule/schedule.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';

export class ActivityModel
  extends CrudModel implements ActivityEntity {

  public contactName: string;
  public description: string;
  public mail: string;
  public name: string;
  public phone: string;

  public addressId: string;
  public categoryId: string;
  public organisationId: string;

  public address: Observable<AddressModel>;
  public category: Observable<CategoryModel>;
  public organisation: Observable<OrganisationModel>;
  public schedules: Observable<ScheduleModel[]>;
  public tags: Observable<TagModel[]>;
  public targetGroups: Observable<TargetGroupModel[]>;

}
