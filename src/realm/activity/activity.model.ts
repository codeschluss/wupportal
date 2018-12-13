import { CrudModel } from '@portal/core';
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

  public address: Promise<AddressModel>;
  public category: Promise<CategoryModel>;
  public organisation: Promise<OrganisationModel>;
  public schedules: Promise<ScheduleModel[]>;
  public tags: Promise<TagModel[]>;
  public targetGroups: Promise<TargetGroupModel[]>;

}
