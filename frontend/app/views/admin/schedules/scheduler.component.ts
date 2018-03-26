import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
	DataServiceFactory,
	ScheduleService
} from 'app/services/data.service.factory';

import { Schedule } from '../../../models/schedule';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { RRule, RRuleSet, Weekday } from 'rrule';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { DataService } from 'app/services/data.service';

import { AuthenticationService } from 'app/services/authentication.service';
import { Constants } from 'app/services/constants';
import { Object } from 'openlayers';
import { Subscription } from 'rxjs/Subscription';
import { generate } from 'rxjs/observable/generate';


@Component({
	selector: 'scheduler-component-form',
	templateUrl: 'scheduler.component.html',
	styleUrls: ['../../../app.component.css'],
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
	currentStartDate: FormControl;
	currentStartTimeHour: FormControl;
	currentStartTimeMinute: FormControl;
	currentEndDate: FormControl;
	currentEndTimeHour: FormControl;
	currentEndTimeMinute: FormControl;
	panelNumber: number;
	toDeleteSchedules: Schedule[];

	constructor(
		public constants: Constants,
		private adapter: DateAdapter<any>,
		@Inject(ScheduleService) private scheduleService: DataService,
	) {
	}

	ngOnInit(): void {
		this.adapter.setLocale(this.constants.countryCode);
		this.formGroup = new FormGroup({
			'startTimeHourCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[0].startTime).hour() : moment().hour()),
			'startTimeMinuteCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[0].startTime).minute() : moment().minute()),
			'endTimeHourCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[0].endTime).hour() : moment().hour()),
			'endTimeMinuteCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[0].endTime).minute() : moment().minute()),
			'startDateCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[0].startDate) : moment()),
			'endDateCtrl': new FormControl(this.schedules[0] ?
				moment(this.schedules[this.schedules.length - 1].end_date) : moment()),
			'rythmPeriodCtrl': new FormControl(1),
			'weekdaysCtrl': new FormControl([1]),
			'weekdayNumberCtrl': new FormControl(1),
			'monthlyRecurrenceCtrl': new FormControl('monthDate'),
			'monthDateCtrl': new FormControl(1),
			'rythmUnitCtrl': new FormControl('unique'),
			'schedulesCtrl': new FormControl(this.schedules, [Validators.required])
		});

		this.formGroup.get('schedulesCtrl').valueChanges.subscribe(schedules => {
			this.onScheduleChange.emit(schedules);
		});
		this.declerateDateForms(-1);
	}

	generateSchedules(): void {
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
						if (startDate.date() > this.formGroup.get('monthDateCtrl').value) {
							startDate.add(this.formGroup.get('rythmPeriodCtrl').value, 'month');
						}
						startDate.date(this.formGroup.get('monthDateCtrl').value);
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
		this.formGroup.get('schedulesCtrl').setValue(this.schedules);
	}

	addOneSchedule(): void {
		this.schedules.push(new Schedule({}));
		this.declerateDateForms(this.schedules.length - 1);
	}

	declerateDateForms(i: number): void {
		if (i >= 0) {
			if (this.schedules[i]) {
				this.currentStartDate = new FormControl(this.schedules[i].start_date);
				this.currentStartTimeHour = new FormControl(moment(this.schedules[i].startTime).hour());
				this.currentStartTimeMinute = new FormControl(moment(this.schedules[i].startTime).minute());
				this.currentEndDate = new FormControl(this.schedules[i].end_date);
				this.currentEndTimeHour = new FormControl(moment(this.schedules[i].endTime).hour());
				this.currentEndTimeMinute = new FormControl(moment(this.schedules[i].endTime).minute());
			}
			this.panelNumber = i;
		} else {
			this.currentStartDate = new FormControl();
			this.currentStartTimeHour = new FormControl();
			this.currentStartTimeMinute = new FormControl();
			this.currentEndDate = new FormControl();
			this.currentEndTimeHour = new FormControl();
			this.currentEndTimeMinute = new FormControl();
		}
	}

	changeDate(i: number): void {
		this.schedules[i].startDate = this.currentStartDate.value;
		this.schedules[i].startTimeHour = this.currentStartTimeHour.value;
		this.schedules[i].startTimeMinute = this.currentStartTimeMinute.value;
		this.schedules[i].endDate = this.currentEndDate.value;
		this.schedules[i].endTimeHour = this.currentEndTimeHour.value;
		this.schedules[i].endTimeMinute = this.currentEndTimeMinute.value;
		this.panelNumber = -1;
	}

	removeDateEntry(i: number): void {
		if (!this.toDeleteSchedules) {
			this.toDeleteSchedules = [];
			this.formGroup.get('startDateCtrl').setValue(moment());
		}
		this.toDeleteSchedules.push(this.schedules[i]);
		if (i === 0) {
			this.removeCompleteSchedule();
		} else {
			this.schedules.splice(i, 1);
		}
	}

	removeCompleteSchedule(): void {
		this.toDeleteSchedules = this.schedules;
		this.schedules = [];
		this.formGroup.get('schedulesCtrl').setValue(this.schedules);
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
