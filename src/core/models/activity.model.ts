import { ActivityEntity } from '../api/models/activity-entity';
import { BaseModel } from '../base/base.model';
import { ActivityProvider } from '../providers/activity.provider';
import { AddressModel } from './address.model';
import { CategoryModel } from './category.model';
import { OrganisationModel } from './organisation.model';
import { ScheduleModel } from './schedule.model';
import { TagModel } from './tag.model';
import { TargetGroupModel } from './target-group.model';
import { UserModel } from './user.model';

export class ActivityModel
  extends BaseModel implements ActivityEntity {

  public provider = ActivityProvider;

  public description: string;
  public name: string;
  public showUser: boolean;

  public address: Promise<AddressModel>;
  public category: Promise<CategoryModel>;
  public organisation: Promise<OrganisationModel>;
  public schedules: Promise<ScheduleModel[]>;
  public tags: Promise<TagModel[]>;
  public targetGroups: Promise<TargetGroupModel[]>;
  public user: Promise<UserModel>;

}
