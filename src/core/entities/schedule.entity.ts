import { AbstractEntity } from './abstract.entity';
import { ActivityEntity } from './activity.entity';

export class ScheduleEntity extends AbstractEntity {

  public end_date: string;
  public start_date: string;

  public activity: ActivityEntity;

}
