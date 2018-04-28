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
	styleUrls: ['../admin.area.css', '../../../app.component.css'],
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
	]
})

export class NewScheduleDialogComponent {

	formGroup: FormGroup;

	constructor(
		private adapter: DateAdapter<any>,
		public dialogRef: MatDialogRef<NewScheduleDialogComponent>,
		private constants: Constants
	) {
		this.adapter.setLocale(this.constants.defaultCountryCode);
		this.formGroup = new FormGroup({
			'startTimeHourCtrl': new FormControl('', [
				Validators.required
			]),
			'startTimeMinuteCtrl': new FormControl('', [
				Validators.required
			]),
			'endTimeHourCtrl': new FormControl('', [
				Validators.required
			]),
			'endTimeMinuteCtrl': new FormControl('', [
				Validators.required
			]),
			'startDateCtrl': new FormControl('', [
				Validators.required
			]),
			'endDateCtrl': new FormControl('', [
				Validators.required
			]),
		});
	}

	onCancel(): void {
		this.dialogRef.close();
	}

	generateNewEntry(): Schedule {
		const schedule = new Schedule({});
		schedule.startDate = moment(this.formGroup.get('startDateCtrl').value).add(1, 'day').format();
		schedule.startTimeHour = this.formGroup.get('startTimeHourCtrl').value;
		schedule.startTimeMinute = this.formGroup.get('startTimeMinuteCtrl').value;
		schedule.endDate = moment(this.formGroup.get('endDateCtrl').value).add(1, 'day').format();
		schedule.endTimeHour = this.formGroup.get('endTimeHourCtrl').value;
		schedule.endTimeMinute = this.formGroup.get('endTimeMinuteCtrl').value;
		return schedule;
	}

	onSubmit(): void {
		this.dialogRef.close(this.generateNewEntry());
	}
}
