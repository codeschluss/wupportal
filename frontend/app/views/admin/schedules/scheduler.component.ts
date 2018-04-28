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
		@Inject(ScheduleService) private scheduleService: DataService,
	) {
	}

	ngOnInit(): void {
		this.adapter.setLocale(this.constants.defaultCountryCode);

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
		});

		this.currScheduleFormGroup = new FormGroup({
			'currentStartDate': new FormControl('', [
				Validators.required
			]),
			'currentStartTimeHour': new FormControl('', [
				Validators.required
			]),
			'currentStartTimeMinute': new FormControl('', [
				Validators.required
			]),
			'currentEndDate': new FormControl('', [
				Validators.required
			]),
			'currentEndTimeHour': new FormControl('', [
				Validators.required
			]),
			'currentEndTimeMinute': new FormControl('', [
				Validators.required
			])
		});

		this.schedulesCtrl = new FormControl(this.schedules, [Validators.required]);

		this.schedulesCtrl.valueChanges.subscribe(schedules => {
			this.onScheduleChange.emit(schedules);
		});
		this.declerateDateForms(-1);
	}

	generateSchedules(): void {
		if (this.formGroup.get('rythmPeriodCtrl').value > 0 && this.formGroup.get('rythmUnitCtrl').value !== 'unique') {
			if (!this.schedules) {
				this.schedules = [];
			}
			let startDate = moment(this.formGroup.get('startDateCtrl').value).add(1, 'day');
			const endDate = moment(this.formGroup.get('endDateCtrl').value).add(1, 'day');
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
						if (startDate.date() > this.formGroup.get('monthDateCtrl').value) {
							startDate.add(this.formGroup.get('rythmPeriodCtrl').value, 'month');
						}
						startDate = startDate.date(this.formGroup.get('monthDateCtrl').value).add(1, 'day');
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
				currSchedule.startDate = moment(date).utc().format();
				currSchedule.startTimeHour = this.formGroup.get('startTimeHourCtrl').value;
				currSchedule.startTimeMinute = this.formGroup.get('startTimeMinuteCtrl').value;
				currSchedule.endDate = moment(date).utc().format();
				currSchedule.endTimeHour = this.formGroup.get('endTimeHourCtrl').value;
				currSchedule.endTimeMinute = this.formGroup.get('endTimeMinuteCtrl').value;
				this.schedules.push(currSchedule);
			});
		} else {
			const oneTimeSchedule: Schedule = new Schedule({});
			oneTimeSchedule.startDate = moment(this.formGroup.get('startDateCtrl').value).add(1, 'day').format();
			oneTimeSchedule.endDate = moment(this.formGroup.get('endDateCtrl').value).add(1, 'day').format();
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

	declerateDateForms(i: number): void {
		if (i >= 0) {
			if (this.schedules[i]) {
				this.currScheduleFormGroup.get('currentStartDate').setValue(this.schedules[i].startDate);
				this.currScheduleFormGroup.get('currentStartTimeHour').setValue(moment(this.schedules[i].startTime).hour());
				this.currScheduleFormGroup.get('currentStartTimeMinute').setValue(moment(this.schedules[i].startTime).minute());
				this.currScheduleFormGroup.get('currentEndDate').setValue(this.schedules[i].endDate);
				this.currScheduleFormGroup.get('currentEndTimeHour').setValue(
					moment(this.schedules[i].endTime).hour());
				this.currScheduleFormGroup.get('currentEndTimeMinute').setValue(
					moment(this.schedules[i].endTime).minute());
			}
			this.panelNumber = i;
		} else {
			this.currScheduleFormGroup.get('currentStartDate').reset();
			this.currScheduleFormGroup.get('currentStartTimeHour').reset();
			this.currScheduleFormGroup.get('currentStartTimeMinute').reset();
			this.currScheduleFormGroup.get('currentEndDate').reset();
			this.currScheduleFormGroup.get('currentEndTimeHour').reset();
			this.currScheduleFormGroup.get('currentEndTimeMinute').reset();
		}
	}

	changeDate(i: number): void {
		this.schedules[i].startDate = moment(this.currScheduleFormGroup.get('currentStartDate').value).format();
		this.schedules[i].startTimeHour = this.currScheduleFormGroup.get('currentStartTimeHour').value;
		this.schedules[i].startTimeMinute = this.currScheduleFormGroup.get('currentStartTimeMinute').value;
		this.schedules[i].endDate = moment(this.currScheduleFormGroup.get('currentEndDate').value).format();
		this.schedules[i].endTimeHour = this.currScheduleFormGroup.get('currentEndTimeHour').value;
		this.schedules[i].endTimeMinute = this.currScheduleFormGroup.get('currentEndTimeMinute').value;
		this.panelNumber = -1;
	}

	removeDateEntry(i: number): void {
		if (!this.toDeleteSchedules) {
			this.toDeleteSchedules = [];
			this.formGroup.get('startDateCtrl').setValue(moment());
		}
		this.toDeleteSchedules.push(this.schedules[i]);
		this.schedules.splice(i, 1);
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
