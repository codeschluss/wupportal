import { AbstractEntity } from './abstract.entity';
import { ActivityEntity } from './activity.entity';

export class ScheduleEntity extends AbstractEntity {

  public end_date: Date;
  public start_date: Date;

  public activity: ActivityEntity;

}
