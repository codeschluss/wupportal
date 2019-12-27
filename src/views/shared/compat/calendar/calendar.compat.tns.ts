import { AfterViewInit, Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarSelectionEventData, CalendarYearViewStyle, MonthCellStyle } from 'nativescript-ui-calendar';
import { RadCalendarComponent } from 'nativescript-ui-calendar/angular/calendar-directives';
import { Color } from 'tns-core-modules/color/color';
import { ScheduleModel as Schedule } from '../../../../realm/models/schedule.model';
import { CalendarCompat } from './calendar.compat.i';

@Component({
  selector: 'calendar-compat',
  styleUrls: ['calendar.compat.scss'],
  template: `
    <GridLayout>
      <RadCalendar
        eventsViewMode="Inline"
        selectionMode="Single"
        [eventSource]="events"
        [yearViewStyle]="styles.yearViewStyle"
        (dateSelected)="select($event)">
      </RadCalendar>
    </GridLayout>
  `
})

export class CalendarCompatComponent implements CalendarCompat, AfterViewInit {

  @Output()
  public changed: EventEmitter<Schedule> = new EventEmitter<Schedule>();

  @HostBinding('attr.compat')
  public readonly compat: string = 'calendar';

  @ViewChild(RadCalendarComponent, { static: true })
  public instance: RadCalendarComponent;

  @Input()
  public items: Schedule[];

  @Input()
  public name: string;

  public styles: any = {
    yearViewStyle: Object.assign(new CalendarYearViewStyle(), {
      monthCellStyle: Object.assign(new MonthCellStyle(), {
        dayNameTextSize: 0
      })
    })
  };

  public get events(): CalendarEvent[] {
    return this.items.map((item) => new CalendarEvent(
      `${this.name}\n${item.datetime}`,
      item.start,
      item.start,
      true,
      new Color(222, 0, 0, 0)
    ));
  }

  public get startdate(): Date {
    return this.items.length ? this.items[0].start : new Date();
  }

  public ngAfterViewInit(): void {
    this.instance.calendar.goToDate(this.startdate);
  }

  public select(event: CalendarSelectionEventData): void {
    this.changed.emit(this.schedule(new Date(event.date.setHours(0, 0, 0, 0))));
  }

  private schedule(date: Date): Schedule {
    return this.items.find((schedule) =>
      !(schedule.start.setHours(0, 0, 0, 0).valueOf() - date.valueOf()));
  }

}
