import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { SessionProvider } from '@wooportal/core';
import { ScheduleModel as Schedule } from '../../../base/models/schedule.model';
import { CalendarComponent as Compat } from './calendar.component.i';

@Component({
  selector: 'calendar-component',
  styleUrls: ['calendar.component.scss'],
  template: `
    <mat-calendar
      [dateFilter]="selectable"
      [startAt]="startdate"
      (click)="click($event)"
      (selectedChange)="select($event)">
    </mat-calendar>
  `
})

export class CalendarComponent implements Compat {

  @Output()
  public changed: EventEmitter<Schedule> = new EventEmitter<Schedule>();

  @HostBinding('attr.component')
  public readonly component: string = 'calendar';

  @ViewChild(MatCalendar, { static: true })
  public instance: MatCalendar<Date>;

  @Input()
  public items: Schedule[];

  @Input()
  public name: string;

  public selectable: (date: Date) => boolean = this.scheduled.bind(this);

  public get startdate(): Date {
    return this.items.length ? this.items[0].start : new Date();
  }

  public constructor(
    dateAdapter: DateAdapter<Date>,
    sessionProvider: SessionProvider
  ) {
    dateAdapter.getFirstDayOfWeek = () => 1;
    dateAdapter.setLocale(sessionProvider.getLanguage());
  }

  public click(event: Event): void {
    const cell = (event.target as HTMLElement).parentElement;

    if (cell.classList.contains('mat-calendar-body-disabled')) {
      this.changed.emit(null);
    }
  }

  public select(date: Date): void {
    this.changed.emit(this.schedule(date));
  }

  private schedule(date: Date): Schedule {
    return this.items.find((schedule) =>
      !(schedule.start.setHours(0, 0, 0, 0).valueOf() - date.valueOf()));
  }

  private scheduled(date: Date): boolean {
    return this.schedule(date) ? true : false;
  }

}
