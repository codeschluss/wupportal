import { ResourceActivityEntity } from '../api/models/resource-activity-entity';
import { AbstractEntity } from './abstract.entity';
import { AddressEntity } from './address.entity';
import { CategoryEntity } from './category.entity';
import { ProviderEntity } from './provider.entity';
import { ScheduleEntity } from './schedule.entity';
import { TagEntity } from './tag.entity';
import { TargetGroupEntity } from './targetgroup.entity';

export class ActivityEntity extends AbstractEntity
  implements ResourceActivityEntity {

  public description: string;
  public name: string;
  public show_user: boolean;

  public address: AddressEntity;
  public category: CategoryEntity;
  public provider: ProviderEntity;
  public schedules: ScheduleEntity[];
  public tags: TagEntity[];
  public target_groups: TargetGroupEntity[];

}
