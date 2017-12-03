import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { DataServiceFactory, UserService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { ValidationService } from 'app/services/validation.service';
import { Constants } from 'app/views/common/constants';

import { User } from 'app/models/user';
import { AuthenticationService } from 'app/services/authentication.service';
import { UserFormComponent } from 'app/views/admin/users/user.form';


@Component({
	selector: 'register-user',
	templateUrl: 'user.form.html',
	styleUrls: ['user.form.css'],
	providers: [
		{ provide: UserService, useFactory: DataServiceFactory(UserService), deps: [HttpClient, AuthenticationService] }
	]
})

export class RegisterFormComponent extends UserFormComponent implements OnInit {


	ngOnInit(): void {
		this.user = new User();
		this.initAllOrganisationsThenControls();
	}

	onSubmit(): void {
		this.setUser();
		this.userService.add(this.user)
			.subscribe(something => {
				this.back();
			});
	}

	initPasswordForm(): void {
		this.passwordGroup = new FormGroup({
			'passwordCtrl': new FormControl('', [
				Validators.required
			]),
			'confirmPasswordCtrl': new FormControl('', [
				Validators.required
			]),
		}, this.validation.passwordMatch);
	}

	passwordInvalid(): string {
		return this.constants.notSamePasswordMessage + ' ' +
			this.constants.orAreEmptyMessage;
	}

}
