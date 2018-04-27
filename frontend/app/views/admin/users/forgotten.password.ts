import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Constants } from '../../../services/constants';
import { DataService } from '../../../services/data.service';
import { MailService } from '../../../services/data.service.factory';


@Component({
	selector: 'forgotten-password-form',
	templateUrl: 'forgotten.password.html',
	styleUrls: ['user.form.css', '../admin.area.css', '../../../app.component.css']
})

export class ForgottenPasswordFormComponent {

	private formGroup: FormGroup;

	constructor(
		public constants: Constants,
		private location: Location,
		@Inject(MailService) private mailService: DataService,
	) {
		this.formGroup = new FormGroup({
			'mailCtrl': new FormControl('', Validators.required)
		});
	}

	onSubmit(): any {
		console.log('submit', this.formGroup.get('mailCtrl').value);
		const data = {
			message: this.constants.forgottenPasswordMessage,
			mailRecipient: this.formGroup.get('mailCtrl').value,
			subject: this.constants.forgottenPassword,
			resetPassword: true
		};
		this.mailService
			.add(data)
			.subscribe(() => this.back());
	}

	back(): void {
		this.location.back();
	}
}
