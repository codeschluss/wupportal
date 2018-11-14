import { ScheduleEntity } from '../api/models/schedule-entity';
import { AbstractModel } from './abstract.model';
import { ActivityModel } from './activity.model';

export class ScheduleModel extends AbstractModel implements ScheduleEntity {

  public endDate: string;
  public startDate: string;

  public activity: ActivityModel;

}
