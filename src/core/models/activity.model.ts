import { ActivityEntity } from '../api/models/activity-entity';
import { ScheduleEntity } from '../api/models/schedule-entity';
import { TagEntity } from '../api/models/tag-entity';
import { TargetGroupEntity } from '../api/models/target-group-entity';
import { BaseModel } from '../base/base.model';
import { AddressModel } from './address.model';
import { CategoryModel } from './category.model';

export class ActivityModel extends BaseModel
  implements ActivityEntity {

  public description: string;
  public name: string;
  public showUser: boolean;

  public address: AddressModel;
  public category: CategoryModel;
  public schedules: ScheduleEntity[];
  public tags: TagEntity[];
  public targetGroups: TargetGroupEntity[];

}
