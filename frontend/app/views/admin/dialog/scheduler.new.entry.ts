import { Component } from '@angular/core';

import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import * as moment from 'moment';

import { Constants } from '../../../services/constants';
import { Schedule } from '../../../models/schedule';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';


@Component({
	selector: 'new-schedule-dialog',
	templateUrl: 'scheduler.new.entry.component.html',
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
	]
})

export class NewScheduleDialogComponent {
	startDate: FormControl;
	startTimeHour: FormControl;
	startTimeMinute: FormControl;
	endDate: FormControl;
	endTimeHour: FormControl;
	endTimeMinute: FormControl;

	constructor(
		private adapter: DateAdapter<any>,
		public dialogRef: MatDialogRef<NewScheduleDialogComponent>,
		private constants: Constants
	) {
		this.adapter.setLocale(this.constants.countryCode);
		this.setFormControls();
	}

	onCancel(): void {
		this.dialogRef.close();
	}

	setFormControls(): void {
		const initStartDate = moment().utc();
		const initEndDate = moment().utc();
		console.log('initEndDate:', initEndDate);
		this.startDate = new FormControl(initStartDate);
		console.log('this.startDate.value in setFormCtrls():', this.startDate.value);
		this.startTimeHour = new FormControl(initStartDate.hour);
		this.startTimeMinute = new FormControl(initStartDate.minute);
		this.endDate = new FormControl(initEndDate);
		this.endTimeHour = new FormControl(initEndDate.hour);
		this.endTimeMinute = new FormControl(initEndDate.minute);
	}

	generateNewEntry(): Schedule {
		const schedule = new Schedule({});
		schedule.startDate = this.startDate.value.add(1, 'day');
		schedule.startTimeHour = this.startTimeHour.value;
		schedule.startTimeMinute = this.startTimeMinute.value;
		schedule.endDate = this.endDate.value.add(1, 'day');
		schedule.endTimeHour = this.endTimeHour.value;
		schedule.endTimeMinute = this.endTimeMinute.value;
		console.log('schedule:', schedule);
		return schedule;
	}

	onSubmit(): void {
		this.dialogRef.close(this.generateNewEntry());
	}
}
