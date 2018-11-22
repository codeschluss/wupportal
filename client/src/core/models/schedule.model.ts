import { ScheduleEntity } from '../api/models/schedule-entity';
import { CrudModel } from '../crud/crud.model';

export class ScheduleModel
  extends CrudModel implements ScheduleEntity {

  public endDate: string;
  public startDate: string;

}
