import { Component } from '@angular/core';
import { BaseFieldComponent } from '@portal/forms';
import * as moment from 'moment';
import { ScheduleModel } from './schedule.model';

@Component({
  template: `
    <mat-chip-list class="mat-body-strong">
      <ng-container *ngFor="let item of value" ngProjectAs="mat-chip">
        <mat-chip [selectable]="false" (removed)="delete(item)">
          <strong>{{ date(item) }}</strong>&nbsp;{{ time(item) }}
          <span matChipRemove>&#x274c;</span>
        </mat-chip>
      </ng-container>
    </mat-chip-list>
  `
})

export class ScheduleFieldComponent extends BaseFieldComponent {

  public date(item: ScheduleModel): string {
    const start = moment(item.startDate);
    return start.format('YYYY-MM-DD');
  }

  public delete(item: ScheduleModel): void {
    this.value = this.value.filter((value) => value !== item);
  }

  public time(item: ScheduleModel): string {
    const end = moment(item.endDate);
    const start = moment(item.startDate);
    return `${start.format('HH:ss')} - ${end.format('HH:ss')}`;
  }

  protected ngPostInit(): void {
    if (!this.value) { this.value = []; }
  }

}
