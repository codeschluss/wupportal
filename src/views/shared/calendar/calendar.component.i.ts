import { EventEmitter } from '@angular/core';
import { ScheduleModel as Schedule } from '../../../base/models/schedule.model';

export interface CalendarComponent {

  changed: EventEmitter<Schedule>;

  readonly component: string;

  instance: any;

  items: Schedule[];

  name: string;

  startdate: Date;

}
