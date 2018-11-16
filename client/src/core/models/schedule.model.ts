import { ScheduleEntity } from '../api/models/schedule-entity';
import { BaseModel } from '../base/base.model';
import { ActivityModel } from './activity.model';

export class ScheduleModel extends BaseModel implements ScheduleEntity {

  public endDate: string;
  public startDate: string;

  public activity: ActivityModel;

}
