import { Component, Type } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CrudModel } from '@portal/core';
import { BaseForm, FormField } from '@portal/forms';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { ScheduleFieldComponent } from './schedule.field';
import { ScheduleModel } from './schedule.model';

@Component({
  selector: 'schedule-form',
  template: `
    <section>
      <label class="mat-body-strong">
        <i18n i18n="@@dateSampling">dateSampling</i18n>
      </label>
      <nav>
        <mat-form-field>
          <mat-label><i18n i18n="@@startDate">startDate</i18n></mat-label>
          <input matInput id="startDate" type="date" [formControl]="onDate">
        </mat-form-field>
        <mat-form-field>
          <mat-label><i18n i18n="@@startTime">startTime</i18n></mat-label>
          <input matInput id="startTime" type="time" [formControl]="onTime">
        </mat-form-field>
        <mat-form-field>
          <mat-label><i18n i18n="@@endDate">endDate</i18n></mat-label>
          <input matInput id="endDate" type="date" [formControl]="offDate">
        </mat-form-field>
        <mat-form-field>
          <mat-label><i18n i18n="@@endTime">endTime</i18n></mat-label>
          <input matInput id="endTime" type="time" [formControl]="offTime">
        </mat-form-field>
      </nav>
    </section>
    <section>
      <label class="mat-body-strong">
        <i18n i18n="@@recurrence">recurrence</i18n>
      </label>
      <nav>
        <mat-form-field>
          <mat-select [formControl]="recurrence">
            <mat-option value="off">
              <i18n i18n="@@recurrenceOff">recurrenceOff</i18n>
            </mat-option>
            <mat-option value="day">
              <i18n i18n="@@recurrenceDaily">recurrenceDaily</i18n>
            </mat-option>
            <mat-option value="week">
              <i18n i18n="@@recurrenceWeekly">recurrenceWeekly</i18n>
            </mat-option>
            <mat-option value="month">
              <i18n i18n="@@recurrenceMonthly">recurrenceMonthly</i18n>
            </mat-option>
            <mat-option value="year">
              <i18n i18n="@@recurrenceYearly">recurrenceYearly</i18n>
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-button [disabled]="!valid" (click)="create()">
          <i18n i18n="@@createSchedules">createSchedules</i18n>
        </button>
      </nav>
    </section>
  ` + BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'schedules'">
          <i18n i18n="@@schedules">schedules</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ScheduleFormComponent extends BaseForm<ScheduleModel> {

  public fields: FormField[] = [
    {
      name: 'schedules',
      input: ScheduleFieldComponent,
      model: ScheduleModel
    }
  ];

  public model: Type<ScheduleModel> = ScheduleModel;

  public recurrence: FormControl = new FormControl('off');

  public samples: FormGroup = new FormGroup({
    offDate: new FormControl(),
    offTime: new FormControl(),
    onDate: new FormControl(),
    onTime: new FormControl()
  });

  public get offDate(): AbstractControl { return this.samples.get('offDate'); }
  public get offTime(): AbstractControl { return this.samples.get('offTime'); }
  public get onDate(): AbstractControl { return this.samples.get('onDate'); }
  public get onTime(): AbstractControl { return this.samples.get('onTime'); }

  public get valid(): boolean {
    return Object.values(this.samples.value).every(Boolean);
  }

  public ngPostInit(): void {
    this.fields[0].value = Array.isArray(this.item) ? this.item : [];
    this.samples.valueChanges.subscribe((sample) => this.update(sample));
  }

  public create(): void {
    const { offDate, offTime, onDate, onTime } = this.samples.value;
    const field = this.group.get('schedules');
    const format = 'YYYY-MM-DD HH:mm';

    const off = moment(`${offDate} ${offTime}`, format);
    const on = moment(`${onDate} ${onTime}`, format);
    const start = Object.assign(new this.model(), {
      endDate: off.format(),
      startDate: on.format()
    });

    switch (this.recurrence.value) {
      case 'off':
        field.patchValue(field.value.concat(start));
        break;
    }
  }

  protected persist(items?: { [key: string]: CrudModel }): Observable<any> {
    return of(this.value('schedules', items));
  }

  private update(sample: any): void {
    const { offDate, offTime, onDate, onTime } = sample;
    const format = 'YYYY-MM-DD HH:mm';

    const off = moment(`${offDate} ${offTime}`, format);
    const on = moment(`${onDate} ${onTime}`, format);

    switch (true) {
      case (on.isAfter(off) || (on.isValid() && !off.isValid())):
        this.offDate.patchValue(this.onDate.value, { emitEvent: false });
        this.offTime.patchValue(this.onTime.value, { emitEvent: false });
        break;

      default:
        break;
    }
  }

}
