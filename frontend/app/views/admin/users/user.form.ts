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


@Component({
	selector: 'edit-user',
	templateUrl: 'user.form.html',
	styleUrls: ['user.form.css'],
	providers: [
		{ provide: UserService, useFactory: DataServiceFactory(UserService), deps: [HttpClient] }
	]
})

export class UserFormComponent implements OnInit {

	private user: User;
	private userForm: FormGroup;
	private passwordGroup: FormGroup;

	constructor(
		@Inject(UserService) private service: DataService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		public validation: ValidationService
	) { }


	ngOnInit(): void {
		// TODO: Get current user in the local storage
		this.service.get('00000000-0000-0000-0004-000000000001').subscribe((data) => {
			this.user = data.records;
			this.initFormControls();
		});
	}

	onSubmit(): void {
		this.service.edit(this.user);
		this.location.back();
	}

	back(): void {
		this.location.back();
	}

	initFormControls(): void {
		this.passwordGroup = new FormGroup({
			'newPasswordCtrl': new FormControl(),
			'repeatPasswordCtrl': new FormControl()
		}, this.validation.passwordMatch);

		this.userForm = new FormGroup({
			'usernameCtrl': new FormControl(this.user.username, [
				Validators.required,
				Validators.email
			]),
			'fullnameCtrl': new FormControl(this.user.fullname, Validators.required),
			'phoneCtrl': new FormControl(this.user.phone),
			'passwordGroup': this.passwordGroup
		});
	}

	get usernameCtrl(): any { return this.userForm.get('usernameCtrl'); }
	get fullnameCtrl(): any { return this.userForm.get('fullnameCtrl'); }
	get newPasswordCtrl(): any { return this.userForm.get('newPasswordCtrl'); }
	get repeatPasswordCtrl(): any { return this.userForm.get('repeatPasswordCtrl'); }

}
