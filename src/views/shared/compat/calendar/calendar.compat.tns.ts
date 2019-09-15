import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CrudModel } from '@wooportal/core';
import { CalendarEvent, CalendarSelectionEventData, CalendarYearViewStyle, MonthCellStyle } from 'nativescript-ui-calendar';
import { RadCalendarComponent } from 'nativescript-ui-calendar/angular/calendar-directives';
import { ScheduleModel as Schedule } from '../../../../realm/models/schedule.model';
import { CalendarCompat } from './calendar.compat.i';

@Component({
  selector: 'calendar-compat',
  styleUrls: ['calendar.compat.scss'],
  template: `
    <RadCalendar
      eventsViewMode="Inline"
      selectionMode="Single"
      [eventSource]="events"
      [yearViewStyle]="styles.yearViewStyle"
      (dateSelected)="select($event)">
    </RadCalendar>
  `
})

export class CalendarCompatComponent implements CalendarCompat, OnInit {

  @Output()
  public changed: EventEmitter<Schedule> = new EventEmitter<Schedule>();

  @HostBinding('attr.compat')
  public readonly compat: string = 'calendar';

  @ViewChild(RadCalendarComponent, { static: true })
  public instance: RadCalendarComponent;

  @Input()
  public item: CrudModel & { schedules: Schedule[] };

  public styles: any = {
    yearViewStyle: Object.assign(new CalendarYearViewStyle(), {
      monthCellStyle: Object.assign(new MonthCellStyle(), {
        dayNameTextSize: 0
      })
    })
  };

  public get events(): CalendarEvent[] {
    return this.item.schedules.map((item) => new CalendarEvent(
      this.item.name,
      new Date(item.startDate),
      new Date(item.startDate),
      true
    ));
  }

  public get startdate(): Date {
    return new Date(this.item.schedules[0].startDate);
  }

  public ngOnInit(): void {
    this.instance.calendar.goToDate(this.startdate);
  }

  public select(event: CalendarSelectionEventData): void {
    this.changed.emit(this.schedule(new Date(event.date.setHours(0, 0, 0, 0))));
  }

  private schedule(date: Date): Schedule {
    return this.item.schedules.find((schedule) =>
      !(+new Date(schedule.startDate).setHours(0, 0, 0, 0) - +date));
  }

}
