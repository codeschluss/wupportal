import { EventEmitter } from '@angular/core';
import { CrudModel } from '@wooportal/core';
import { ScheduleModel as Schedule } from '../../../../realm/models/schedule.model';

export interface CalendarCompat {

  changed: EventEmitter<Schedule>;

  readonly compat: string;

  instance: any;

  item: CrudModel & { schedules: Schedule[] };

  startdate: Date;

}
