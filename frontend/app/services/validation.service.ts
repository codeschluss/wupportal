import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';
import { Moment } from 'moment';

export class ValidationService implements ErrorStateMatcher {

	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}

	passwordMatch(g: FormGroup): any {
		return g.get('passwordCtrl').value === g.get('confirmPasswordCtrl').value
			? null : { 'notEquivalent': true };
	}

	validDate(dateForm: FormGroup): any {
		if (dateForm.get('startDateCtrl') && dateForm.get('startTimeHourCtrl') && dateForm.get('startTimeMinuteCtrl')
			&& dateForm.get('endDateCtrl') && dateForm.get('endTimeHourCtrl') && dateForm.get('endTimeMinuteCtrl')) {
			const startMoment = moment(dateForm.get('startDateCtrl').value);
			startMoment.set({ hour: dateForm.get('startTimeHourCtrl').value });
			startMoment.set({ minute: dateForm.get('startTimeMinuteCtrl').value });
			const endMoment = moment(dateForm.get('endDateCtrl').value);
			endMoment.set({ hour: dateForm.get('endTimeHourCtrl').value });
			endMoment.set({ minute: dateForm.get('endTimeMinuteCtrl').value });
			return startMoment.isBefore(endMoment) ? null : { 'endBeforeStart': true };
		}
	}

}
