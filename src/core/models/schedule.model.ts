import { ScheduleEntity } from '../../api/models/schedule-entity';
import { CrudModel } from '../crud/crud.model';

export class ScheduleModel
  extends CrudModel
  implements ScheduleEntity {

  public endDate: string;
  public startDate: string;

  public get datetime(): string {
    const start =
      this.startDate.substr(8, 2) + '.' +
      this.startDate.substr(5, 2) + '.' +
      this.startDate.substr(0, 4) + ', ' +
      this.startDate.substr(11, 5);

    const until =
      this.endDate.substr(8, 2) + '.' +
      this.endDate.substr(5, 2) + '.' +
      this.endDate.substr(0, 4) + ', ' +
      this.endDate.substr(11, 5);

    switch (true) {
      case start.substr(0, 10) === until.substr(0, 10):
        return `${start} - ${until.substr(12)}`;

      case start.substr(2, 8) === until.substr(2, 8):
        return `${start.substr(0, 3)}, ${start.substr(12)} - ${until}`;

      case start.substr(5, 5) === until.substr(5, 5):
        return `${start.substr(0, 6)}, ${start.substr(12)} - ${until}`;

      default:
        return `${start} - ${until}`;
    }
  }

  public get start(): Date {
    return new Date(this.startDate.substr(0, 23));
  }

  public get until(): Date {
    return new Date(this.endDate.substr(0, 23));
  }

}
