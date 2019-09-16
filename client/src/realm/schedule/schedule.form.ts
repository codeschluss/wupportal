import { AfterViewInit, Component, Type, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChip, MatChipList } from '@angular/material';
import { BaseForm, FormField } from '@portal/forms';
import * as moment from 'moment';
import { merge, Observable, of } from 'rxjs';
import { ScheduleFieldComponent } from './schedule.field';
import { ScheduleModel } from './schedule.model';

@Component({
  selector: 'schedule-form',
  styles: [`
    mat-chip { cursor: pointer; }
  `],
  template: BaseForm.template(`
    <section>
      <label class="mat-body-strong">
        <i18n i18n="@@schedule">schedule</i18n>
      </label>
      <nav>
        <mat-form-field>
          <strong matPrefix>
            <i18n i18n="@@startDate">startDate</i18n>&nbsp;
          </strong>
          <input matInput type="date" [formControl]="fromDate">
        </mat-form-field>
        <mat-form-field>
          <strong matPrefix>
            <i18n i18n="@@startTime">startTime</i18n>&nbsp;
          </strong>
          <input matInput type="time" [formControl]="fromTime">
        </mat-form-field>
        <mat-form-field>
          <strong matPrefix>
            <i18n i18n="@@endDate">endDate</i18n>&nbsp;
          </strong>
          <input matInput type="date" [formControl]="gotoDate">
        </mat-form-field>
        <mat-form-field>
          <strong matPrefix>
            <i18n i18n="@@endTime">endTime</i18n>&nbsp;
          </strong>
          <input matInput type="time" [formControl]="gotoTime">
        </mat-form-field>
      </nav>
    </section>
    <section>
      <label class="mat-body-strong">
        <i18n i18n="@@recurrence">recurrence</i18n>
      </label>
      <nav>
        <mat-form-field>
          <strong matPrefix>
            <i18n i18n="@@recurrence">recurrence</i18n>&nbsp;
          </strong>
          <mat-select [formControl]="recurrence">
            <mat-option value="once">
              <i18n i18n="@@once">once</i18n>
            </mat-option>
            <mat-option value="day">
              <i18n i18n="@@daily">daily</i18n>
            </mat-option>
            <mat-option value="week">
              <i18n i18n="@@weekly">weekly</i18n>
            </mat-option>
            <mat-option value="month">
              <i18n i18n="@@monthly">monthly</i18n>
            </mat-option>
            <mat-option value="year">
              <i18n i18n="@@yearly">yearly</i18n>
            </mat-option>
          </mat-select>
        </mat-form-field>
        <ng-container *ngIf="recurrence.value !== 'once'">
          <mat-form-field>
            <strong matPrefix>
              <i18n i18n="@@until">until</i18n>&nbsp;
            </strong>
            <input matInput type="date" [formControl]="until">
          </mat-form-field>
        </ng-container>
        <ng-container *ngIf="recurrence.value === 'week'">
          <mat-chip-list multiple class="mat-body">
            <mat-chip #monday="matChip" value="monday"
              (click)="monday.toggleSelected()">
              <i18n i18n="@@monday">monday</i18n>
            </mat-chip>
            <mat-chip #tuesday="matChip" value="tuesday"
              (click)="tuesday.toggleSelected()">
              <i18n i18n="@@tuesday">tuesday</i18n>
            </mat-chip>
            <mat-chip #wednesday="matChip" value="wednesday"
              (click)="wednesday.toggleSelected()">
              <i18n i18n="@@wednesday">wednesday</i18n>
            </mat-chip>
            <mat-chip #thursday="matChip" value="thursday"
              (click)="thursday.toggleSelected()">
              <i18n i18n="@@thursday">thursday</i18n>
            </mat-chip>
            <mat-chip #friday="matChip" value="friday"
              (click)="friday.toggleSelected()">
              <i18n i18n="@@friday">friday</i18n>
            </mat-chip>
            <mat-chip #saturday="matChip" value="saturday"
              (click)="saturday.toggleSelected()">
              <i18n i18n="@@saturday">saturday</i18n>
            </mat-chip>
            <mat-chip #sunday="matChip" value="sunday"
              (click)="sunday.toggleSelected()">
              <i18n i18n="@@sunday">sunday</i18n>
            </mat-chip>
          </mat-chip-list>
        </ng-container>
      </nav>
    </section>
    <section>
      <label class="mat-body-strong">
        <i18n i18n="@@compilation">compilation</i18n>
      </label>
      <nav>
        <button mat-button color="warn" (click)="clear()">
          <i18n i18n="@@deleteAll">deleteAll</i18n>
        </button>
        <button mat-button color="primary" [disabled]="!scheduled"
          (click)="create()">
          <i18n i18n="@@createSchedules">createSchedules</i18n>
        </button>
      </nav>
    </section>

    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'schedules'">
          <i18n i18n="@@schedules">schedules</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ScheduleFormComponent
  extends BaseForm<ScheduleModel>
  implements AfterViewInit {

  @ViewChild(MatChipList)
  public days: MatChipList;

  public fields: FormField[] = [
    {
      name: 'schedules',
      input: ScheduleFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<ScheduleModel> = ScheduleModel;

  public recurrence: FormControl = new FormControl('once');

  public until: FormControl = new FormControl();

  private formats: any = { date: 'YYYY-MM-DD', time: 'HH:mm' };

  private values: FormGroup = new FormGroup({
    fromDate: new FormControl(moment().format(this.formats.date)),
    fromTime: new FormControl(moment().add(1, 'h').format(this.formats.time)),
    gotoDate: new FormControl(moment().format(this.formats.date)),
    gotoTime: new FormControl(moment().add(3, 'h').format(this.formats.time))
  });

  public get fromDate(): AbstractControl { return this.values.get('fromDate'); }
  public get fromTime(): AbstractControl { return this.values.get('fromTime'); }
  public get gotoDate(): AbstractControl { return this.values.get('gotoDate'); }
  public get gotoTime(): AbstractControl { return this.values.get('gotoTime'); }

  public get scheduled(): boolean {
    const recurrence = this.recurrence.value !== 'week'
      || (this.days && (this.days.selected as MatChip[]).length);
    const until = this.recurrence.value === 'once'
      || moment(this.until.value, this.formats.date).isValid();
    const values = Object.values(this.values.value).every(Boolean);

    return values && recurrence && until;
  }

  public ngAfterViewInit(): void {
    merge(
      this.until.valueChanges,
      this.values.valueChanges
    ).subscribe(() => this.update());

    this.recurrence.valueChanges.subscribe((value) =>
      value === 'once' ? this.until.disable() : this.until.enable());
  }

  public clear(): void {
    this.group.get('schedules').patchValue([]);
  }

  public create(): void {
    const { gotoDate, gotoTime, fromDate, fromTime } = this.values.value;
    const format = `${this.formats.date} ${this.formats.time}`;
    const from = moment.utc(`${fromDate} ${fromTime}`, format, 'en');
    const goto = moment.utc(`${gotoDate} ${gotoTime}`, format, 'en');
    const ival = goto.diff(from);

    const start = from.clone();
    const until = moment(this.until.value, this.formats.date, 'en');

    const values = [Object.assign(new this.model(), {
      endDate: goto.format(),
      startDate: from.format()
    })];

    if (this.recurrence.value !== 'once') {
      while (from.diff(until) < 0) {
        switch (this.recurrence.value) {
          case 'day':
            values.push(Object.assign(new this.model(), {
              endDate: goto.add(1, 'day').format(),
              startDate: from.add(1, 'day').format()
            }));
            break;

          case 'month':
            values.push(Object.assign(new this.model(), {
              endDate: goto.add(1, 'month').format(),
              startDate: from.add(1, 'month').format()
            }));
            break;

          case 'week':
            (this.days.selected as MatChip[])
              .map((chip) => from.clone().day(chip.value))
              .filter((day) => day.isAfter(start))
              .filter((day) => day.isBefore(until))
              .forEach((day) => values.push(Object.assign(new this.model(), {
                endDate: day.clone().add(ival).format(),
                startDate: day.format()
              })));

            from.add(1, 'week').day(0);
            until.endOf('day');
            break;

          case 'year':
            values.push(Object.assign(new this.model(), {
              endDate: goto.add(1, 'year').format(),
              startDate: from.add(1, 'year').format()
            }));
            break;
        }
      }
    }

    const control = this.group.get('schedules');
    control.patchValue(control.value.concat(values));
  }

  public persist(): Observable<any> {
    return of(this.group.get('schedules').value);
  }

  public reset(): void {
    this.group.reset({ schedules: Array.isArray(this.item) ? this.item : [] });
  }

  protected ngPostInit(): void {
    this.fields[0].value = Array.isArray(this.item) ? this.item : [];
  }

  private update(): void {
    const { gotoDate, gotoTime, fromDate, fromTime } = this.values.value;
    const format = `${this.formats.date} ${this.formats.time}`;
    const from = moment(`${fromDate} ${fromTime}`, format);
    const goto = moment(`${gotoDate} ${gotoTime}`, format);
    const until = moment(this.until.value, this.formats.date);

    if (from.isBefore()) {
      this.values.patchValue({
        fromDate: moment().format(this.formats.date),
        fromTime: moment().format(this.formats.time)
      }, { emitEvent: false });
    }

    if (from.isValid() && !goto.isValid() || goto.isBefore(from)) {
      this.values.patchValue({
        gotoDate: from.format(this.formats.date),
        gotoTime: from.format(this.formats.time)
      }, { emitEvent: false });
    }

    if (until.isBefore(from)) {
      this.until.patchValue(
        from.format(this.formats.date),
        { emitEvent: false }
      );
    }

  }

}
