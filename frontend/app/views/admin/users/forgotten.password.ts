import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Constants } from 'app/services/constants';
import { ForgotPasswordService } from 'app/services/data.service.factory';
import { UserService } from 'app/services/user.service';
import { DataService } from 'app/services/data.service';


@Component({
	selector: 'forgotten-password-form',
	templateUrl: 'forgotten.password.html',
	styleUrls: ['user.form.css', '../admin.area.css', '../../../app.component.css']
})

export class ForgottenPasswordFormComponent {

	public mail: string;

	constructor(
		@Inject(ForgotPasswordService) private forgotPwdService: DataService,
		public constants: Constants,
		private userService: UserService
	) { }

	onSubmit(): void {
		this.forgotPwdService
			.add(this.mail)
			.subscribe(() => this.userService.redirectToLogin());
	}

	back(): void {
		this.userService.redirectToLogin();
	}
}
