import { AfterViewInit, Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarSelectionEventData, CalendarYearViewStyle, MonthCellStyle } from 'nativescript-ui-calendar';
import { RadCalendarComponent } from 'nativescript-ui-calendar/angular/calendar-directives';
import { Color } from 'tns-core-modules/color/color';
import { ScheduleModel as Schedule } from '../../../base/models/schedule.model';
import { CalendarComponent as Compat } from './calendar.component.i';

@Component({
  selector: 'calendar-component',
  styleUrls: ['calendar.component.scss'],
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

export class CalendarComponent implements Compat, AfterViewInit {

  @Output()
  public changed: EventEmitter<Schedule> = new EventEmitter<Schedule>();

  @HostBinding('attr.component')
  public readonly component: string = 'calendar';

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
    if (this.instance.calendar.isLoaded) {
      this.instance.calendar.goToDate(this.startdate);
    } else {
      this.instance.calendar.once('loaded', () => this.ngAfterViewInit());
    }
  }

  public select(event: CalendarSelectionEventData): void {
    this.changed.emit(this.schedule(new Date(event.date.setHours(0, 0, 0, 0))));
  }

  private schedule(date: Date): Schedule {
    return this.items.find((schedule) =>
      !(schedule.start.setHours(0, 0, 0, 0).valueOf() - date.valueOf()));
  }

}
