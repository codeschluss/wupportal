import { Component } from '@angular/core';
import { BaseFieldComponent } from '@portal/forms';
import * as moment from 'moment';
import { ScheduleModel } from './schedule.model';

@Component({
  styles: [`
    input[readonly] { flex: none; margin: 4px 0; width: 0; }
  `],
  template: BaseFieldComponent.template(`
    <mat-chip-list #chips class="mat-body-strong">
      <input readonly [id]="field.name" [matChipInputFor]="chips">
      <ng-container *ngFor="let item of sorted" ngProjectAs="mat-chip">
        <mat-chip [selectable]="false" (removed)="delete(item)">
          <strong>{{ date(item) }}</strong>&nbsp;{{ time(item) }}
          <span matChipRemove>&#x274c;</span>
        </mat-chip>
      </ng-container>
    </mat-chip-list>
  `)
})

export class ScheduleFieldComponent extends BaseFieldComponent {

  public get sorted(): ScheduleModel[] {
    return this.value.sort((a, b) => moment(a.startDate).diff(b.startDate));
  }

  public date(item: ScheduleModel): string {
    const from = moment.utc(item.startDate);
    const goto = moment.utc(item.endDate);
    const until = goto.format('DD.MM.YYYY');

    return until === from.format('DD.MM.YYYY') ? until
      : until.endsWith(from.format('.MM.YYYY'))
        ? `${from.format('DD.')} - ${until}`
      : until.endsWith(from.format('.YYYY'))
        ? `${from.format('DD.MM.')} - ${until}`
      : `${from.format('DD.MM.YYYY')} - ${until}`;
  }

  public delete(item: ScheduleModel): void {
    this.value = this.value.filter((value) => value !== item);
  }

  public time(item: ScheduleModel): string {
    const from = moment.utc(item.startDate);
    const goto = moment.utc(item.endDate);
    return `${from.format('HH:mm')} - ${goto.format('HH:mm')}`;
  }

  protected ngPostInit(): void {
    if (!this.value) { this.value = []; }
  }

}
