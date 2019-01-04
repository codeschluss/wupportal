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
    const end = moment(item.endDate).format('DD.MM.YYYY');
    const start = moment(item.startDate).format('DD.MM.YYYY');
    return start === end ? start : `${start} - ${end}`;
  }

  public delete(item: ScheduleModel): void {
    this.value = this.value.filter((value) => value !== item);
  }

  public time(item: ScheduleModel): string {
    const end = moment(item.endDate).format('HH:ss');
    const start = moment(item.startDate).format('HH:ss');
    return `${start} - ${end}`;
  }

  protected ngPostInit(): void {
    if (!this.value) { this.value = []; }
  }

}
