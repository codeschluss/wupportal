import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { ValidationService } from 'app/services/validation.service';

@Directive({
	selector: '[notMatching]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: NotMatchingDirective, multi: true }
	]
})
export class NotMatchingDirective implements Validator {
	@Input() notMatching: string;

	constructor(private validationService: ValidationService) { }

	validate(control: AbstractControl): { [key: string]: any } {
		// if (this.notMatching) {
		// 	return this.validationService.notMatchingValidator(this.notMatching)(control);
		// } else {
		// 	return null;
		// }
		return;
	}
}
