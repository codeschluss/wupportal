import { CrudModel } from '@wooportal/core';
import * as moment from 'moment';
import { ScheduleEntity } from '../../api/models/schedule-entity';

export class ScheduleModel
  extends CrudModel implements ScheduleEntity {

  public endDate: string;
  public startDate: string;

  public get datetime(): string {
    const from = moment.utc(this.startDate);
    const goto = moment.utc(this.endDate);
    const time = goto.format('HH:mm');
    const until = goto.format('DD.MM.YYYY');

    switch (true) {
      case until === from.format('DD.MM.YYYY'):
        return `${until}, ${from.format('HH:mm')} - ${time}`;

      case until.endsWith(from.format('.MM.YYYY')):
        return `${from.format('DD., HH:mm')} - ${until}, ${time}`;

      case until.endsWith(from.format('.YYYY')):
        return `${from.format('DD.MM., HH:mm')} - ${until}, ${time}`;

      default:
        return `${from.format('DD.MM.YYYY, HH:mm')} - ${until}, ${time}`;
    }
  }

  public get end(): Date {
    return moment.utc(this.endDate).toDate();
  }

  public get start(): Date {
    return moment.utc(this.startDate).toDate();
  }

}
