import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { RRule, RRuleSet, Weekday } from 'rrule';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material';

import {
	DataServiceFactory,
	ScheduleService
} from 'app/services/data.service.factory';

import { Schedule } from '../../../models/schedule';
import { NewScheduleDialogComponent } from '../dialog/scheduler.new.entry';
import { DataService } from 'app/services/data.service';
import { Constants } from 'app/services/constants';
import { ValidationService } from '../../../services/validation.service';


@Component({
	selector: 'scheduler-component-form',
	templateUrl: 'scheduler.component.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css'],
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{
			provide: MAT_DATE_FORMATS, useValue: {
				parse: {
					dateInput: 'LL',
				},
				display: {
					dateInput: 'LL',
					monthYearLabel: 'MMM YYYY',
					dateA11yLabel: 'LL',
					monthYearA11yLabel: 'MMMM YYYY',
				},
			}
		},
	]
})

export class SchedulerComponent implements OnInit {

	@Input() schedules: Schedule[];
	@Output() onScheduleChange: EventEmitter<Schedule[]> = new EventEmitter<Schedule[]>();

	formGroup: FormGroup;
	currScheduleFormGroup: FormGroup;

	schedulesCtrl: FormControl;
	panelNumber: number;
	toDeleteSchedules: Schedule[];

	constructor(
		public constants: Constants,
		private adapter: DateAdapter<any>,
		private dialog: MatDialog,
		public validation: ValidationService,
		public currValidation: ValidationService,
		@Inject(ScheduleService) private scheduleService: DataService,
	) {
	}

	ngOnInit(): void {
		this.adapter.setLocale(this.constants.defaultCountryCode);
		this.initCurrFormGroup();
		this.schedulesCtrl = new FormControl(this.schedules, [Validators.required]);

		this.schedulesCtrl.valueChanges.subscribe(schedules => {
			this.onScheduleChange.emit(schedules);
		});
		this.declerateDateForms(-1);
		this.initFormGroups();
	}

	private initFormGroups(): void {
		this.formGroup = new FormGroup({
			'startTimeHourCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[0].startTime).hour() : '', [
					Validators.required
				]),
			'startTimeMinuteCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[0].startTime).minute() : '', [
					Validators.required
				]),
			'endTimeHourCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[0].endTime).hour() : '', [
					Validators.required
				]),
			'endTimeMinuteCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[0].endTime).minute() : '', [
					Validators.required
				]),
			'startDateCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[0].startDate).add(1, 'day') : '', [
					Validators.required
				]),
			'endDateCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[this.schedules.length - 1].endDate).add(1, 'day') : '', [
					Validators.required
				]),
			'rythmPeriodCtrl': new FormControl(1),
			'weekdaysCtrl': new FormControl([1]),
			'weekdayNumberCtrl': new FormControl(1),
			'monthlyRecurrenceCtrl': new FormControl('monthDate'),
			'monthDateCtrl': new FormControl(1),
			'rythmUnitCtrl': new FormControl('unique'),
		}, this.validation.validDate);
	}

	private initCurrFormGroup(): void {
		this.currScheduleFormGroup = new FormGroup({
			'startDateCtrl': new FormControl(new Date(), [
				Validators.required
			]),
			'startTimeHourCtrl': new FormControl('', [
				Validators.required
			]),
			'startTimeMinuteCtrl': new FormControl('', [
				Validators.required
			]),
			'endDateCtrl': new FormControl(new Date(), [
				Validators.required
			]),
			'endTimeHourCtrl': new FormControl('', [
				Validators.required
			]),
			'endTimeMinuteCtrl': new FormControl('', [
				Validators.required
			])
		}, this.currValidation.validDate);
	}

	generateSchedules(): void {
		if (this.formGroup.valid) {
			if (this.formGroup.get('rythmPeriodCtrl').value > 0 && this.formGroup.get('rythmUnitCtrl').value !== 'unique') {
				if (!this.schedules) {
					this.schedules = [];
				}
				const startDate = moment(this.formGroup.get('startDateCtrl').value);
				const endDate = moment(this.formGroup.get('endDateCtrl').value);
				const recurrenceRange = { start: startDate, end: endDate };

				let rule;

				switch (this.formGroup.get('rythmUnitCtrl').value) {
					case 'years':
						rule = new RRule({
							freq: RRule.YEARLY,
							interval: this.formGroup.get('rythmPeriodCtrl').value,
							dtstart: startDate.toDate(),
							until: endDate.toDate()
						});
						break;
					case 'months':
						if (this.formGroup.get('monthlyRecurrenceCtrl').value === 'monthDate') {
							startDate.set({ 'date': this.formGroup.get('monthDateCtrl').value });
							// if (startDate.date() !== this.formGroup.get('monthDateCtrl').value) {
							// 	startDate.add(this.formGroup.get('rythmPeriodCtrl').value, 'month');
							// }
							rule = new RRule({
								freq: RRule.MONTHLY,
								interval: this.formGroup.get('rythmPeriodCtrl').value,
								dtstart: startDate.toDate(),
								until: endDate.toDate()
							});
						} else {
							const byweekdayArray = [];
							for (let i = 0; i < this.formGroup.get('weekdaysCtrl').value.length; i++) {
								let weekday;
								switch (this.formGroup.get('weekdaysCtrl').value[i]) {
									case 0:
										weekday = RRule.MO;
										break;
									case 1:
										weekday = RRule.TU;
										break;
									case 2:
										weekday = RRule.WE;
										break;
									case 3:
										weekday = RRule.TH;
										break;
									case 4:
										weekday = RRule.FR;
										break;
									case 5:
										weekday = RRule.SA;
										break;
									default:
										weekday = RRule.SU;
								}
								byweekdayArray.push(weekday.nth(
									this.formGroup.get('weekdayNumberCtrl').value === 5 ? -1 : this.formGroup.get('weekdayNumberCtrl').value)
								);
							}
							rule = new RRule({
								freq: RRule.MONTHLY,
								interval: this.formGroup.get('rythmPeriodCtrl').value,
								byweekday: byweekdayArray,
								dtstart: startDate.toDate(),
								until: endDate.toDate()
							});
						}
						break;
					case 'weeks':
						rule = new RRule({
							freq: RRule.WEEKLY,
							interval: this.formGroup.get('rythmPeriodCtrl').value,
							byweekday: this.formGroup.get('weekdaysCtrl').value,
							dtstart: startDate.toDate(),
							until: endDate.toDate()
						});
						break;
					default:
						rule = new RRule({
							freq: RRule.DAILY,
							interval: this.formGroup.get('rythmPeriodCtrl').value,
							dtstart: startDate.toDate(),
							until: endDate.toDate()
						});
				}
				const allDates: Date[] = rule.all();
				allDates.map(date => {
					const currSchedule = new Schedule({});
					currSchedule.startDate = moment(date);
					currSchedule.startTimeHour = this.formGroup.get('startTimeHourCtrl').value;
					currSchedule.startTimeMinute = this.formGroup.get('startTimeMinuteCtrl').value;
					currSchedule.endDate = moment(date);
					currSchedule.endTimeHour = this.formGroup.get('endTimeHourCtrl').value;
					currSchedule.endTimeMinute = this.formGroup.get('endTimeMinuteCtrl').value;
					this.schedules.push(currSchedule);
				});
			} else {
				const oneTimeSchedule: Schedule = new Schedule({});
				oneTimeSchedule.startDate = this.formGroup.get('startDateCtrl').value;
				oneTimeSchedule.endDate = this.formGroup.get('endDateCtrl').value;
				oneTimeSchedule.startTimeHour = this.formGroup.get('startTimeHourCtrl').value;
				oneTimeSchedule.startTimeMinute = this.formGroup.get('startTimeMinuteCtrl').value;
				oneTimeSchedule.endTimeHour = this.formGroup.get('endTimeHourCtrl').value;
				oneTimeSchedule.endTimeMinute = this.formGroup.get('endTimeMinuteCtrl').value;
				this.schedules = [];
				this.schedules.push(oneTimeSchedule);
			}
			this.declerateDateForms(-1);
			this.schedulesCtrl.setValue(this.schedules);
		}
	}


	declerateDateForms(i: number): void {
		if (i >= 0) {
			if (this.schedules[i]) {
				this.currScheduleFormGroup.get('startDateCtrl').setValue(this.schedules[i].startDate);
				this.currScheduleFormGroup.get('startTimeHourCtrl').setValue(moment(this.schedules[i].startTime).hour());
				this.currScheduleFormGroup.get('startTimeMinuteCtrl').setValue(moment(this.schedules[i].startTime).minute());
				this.currScheduleFormGroup.get('endDateCtrl').setValue(this.schedules[i].endDate);
				this.currScheduleFormGroup.get('endTimeHourCtrl').setValue(
					moment(this.schedules[i].endTime).hour());
				this.currScheduleFormGroup.get('endTimeMinuteCtrl').setValue(
					moment(this.schedules[i].endTime).minute());
			}
			this.panelNumber = i;
		} else {
			this.currScheduleFormGroup.get('startDateCtrl').reset();
			this.currScheduleFormGroup.get('startTimeHourCtrl').reset();
			this.currScheduleFormGroup.get('startTimeMinuteCtrl').reset();
			this.currScheduleFormGroup.get('endDateCtrl').reset();
			this.currScheduleFormGroup.get('endTimeHourCtrl').reset();
			this.currScheduleFormGroup.get('endTimeMinuteCtrl').reset();
		}
	}

	changeDate(i: number): void {
		this.schedules[i].startDate = moment(this.currScheduleFormGroup.get('startDateCtrl').value);
		this.schedules[i].startTimeHour = this.currScheduleFormGroup.get('startTimeHourCtrl').value;
		this.schedules[i].startTimeMinute = this.currScheduleFormGroup.get('startTimeMinuteCtrl').value;
		this.schedules[i].endDate = moment(this.currScheduleFormGroup.get('endDateCtrl').value);
		this.schedules[i].endTimeHour = this.currScheduleFormGroup.get('endTimeHourCtrl').value;
		this.schedules[i].endTimeMinute = this.currScheduleFormGroup.get('endTimeMinuteCtrl').value;
		this.panelNumber = -1;
	}

	removeDateEntry(i: number): void {
		if (!this.toDeleteSchedules) {
			this.toDeleteSchedules = [];
			this.formGroup.get('startDateCtrl').setValue(moment());
		}
		this.toDeleteSchedules.push(this.schedules[i]);
		this.schedules.splice(i, 1);
		this.schedulesCtrl.setValue(this.schedules);
		if (!this.schedules.length) {
			this.initFormGroups();
		}
	}

	newEntry(): void {
		const dialogRef = this.dialog.open(NewScheduleDialogComponent, {
			minWidth: 550,
			minHeight: 550
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.schedules.push(result);
			}
		});
	}

	removeCompleteSchedule(): void {
		this.toDeleteSchedules = this.schedules;
		this.schedules = [];
		this.schedulesCtrl.setValue(this.schedules);
		this.initFormGroups();
	}

	deleteSchedules(): void {
		if (this.toDeleteSchedules) {
			for (const schedule of this.toDeleteSchedules) {
				if (schedule.id) {
					this.scheduleService.delete(schedule.id).subscribe();
				}
			}
		}
	}

}
