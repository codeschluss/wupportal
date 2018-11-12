import { AbstractEntity } from './abstract.entity';
import { AddressEntity } from './address.entity';
import { CategoryEntity } from './category.entity';
import { ProviderEntity } from './provider.entity';
import { ScheduleEntity } from './schedule.entity';
import { TagEntity } from './tag.entity';
import { TargetGroupEntity } from './target-group.entity';

export class ActivityEntity extends AbstractEntity {

  public address: AddressEntity;
  // public address_id: string;
  public category: CategoryEntity;
  // public category_id: string;
  public description: string;
  public name: string;
  public provider: ProviderEntity;
  // public provider_id: string;
  public schedules: ScheduleEntity[];
  public show_user: boolean;
  public tags: TagEntity[];
  public target_groups: TargetGroupEntity[];

}
