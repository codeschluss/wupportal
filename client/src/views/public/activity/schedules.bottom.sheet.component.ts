import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import * as moment from 'moment';
import { ScheduleModel } from '../../../realm/schedule/schedule.model';


@Component({
  selector: 'bottom-sheet',
  template: '<mat-nav-list><mat-list-item>Termine:</mat-list-item>' +
    '<mat-divider></mat-divider>' +
    '<mat-list-item role="listitem" ' +
    '*ngFor="let schedule of schedulesToString">' +
    '{{ schedule }}' +
    '</mat-list-item></mat-nav-list>',
  styleUrls: []
})
export class BottomSheetScheduleComponent {
  schedules: ScheduleModel[];
  schedulesToString: string[] = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetScheduleComponent>) {
    this.schedules = data.schedules;
    moment.locale('de');
    this.schedules.forEach(schedule => {
      this.schedulesToString.push(
        moment(schedule.startDate).format('llll') + ' - ' +
        moment(schedule.endDate).format('llll'));
    });
  }
}
