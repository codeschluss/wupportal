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
    const until = goto.format('DD.MM.YYYY');

    switch (true) {
      case until === from.format('DD.MM.YYYY'):
        return `${until}, ${from.format('HH:mm')}
          - ${goto.format('HH:mm')}`;
      case until.endsWith(from.format('.MM.YYYY')):
        return `${from.format('DD., HH:mm')}
          - ${until}, ${goto.format('HH:mm')}`;
      case until.endsWith(from.format('.YYYY')):
        return `${from.format('DD.MM., HH:mm')}
          - ${until}, ${goto.format('HH:mm')}`;
      default:
        return `${from.format('DD.MM.YYYY, HH:mm')}
          - ${until}, ${goto.format('HH:mm')}`;
    }
  }

}
