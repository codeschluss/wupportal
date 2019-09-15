import { EventEmitter } from '@angular/core';
import { ScheduleModel as Schedule } from '../../../../realm/models/schedule.model';

export interface CalendarCompat {

  changed: EventEmitter<Schedule>;

  readonly compat: string;

  instance: any;

  items: Schedule[];

  name: string;

  startdate: Date;

}
