import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { DataServiceFactory, OrganisationService, UserService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { ValidationService } from 'app/services/validation.service';
import { Constants } from 'app/views/common/constants';
import { AuthenticationService } from 'app/services/authentication.service';

import { User } from 'app/models/user';
import { Organisation } from 'app/models/organisation';


@Component({
	selector: 'edit-user',
	templateUrl: 'user.form.html',
	styleUrls: ['user.form.css'],
	providers: [
		{ provide: UserService, useFactory: DataServiceFactory(UserService), deps: [HttpClient, AuthenticationService] },
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient, AuthenticationService] }
	]
})

export class UserFormComponent implements OnInit {

	protected user: User;
	protected organisations: Array<Organisation>;

	protected userForm: FormGroup;
	protected passwordGroup: FormGroup;

	constructor(
		@Inject(UserService) public userService: DataService,
		@Inject(OrganisationService) public organisationService: DataService,
		public location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		public validation: ValidationService
	) { }


	ngOnInit(): void {
		// TODO: Get current user in the local storage
		Observable.merge(
			this.userService.get('00000000-0000-0000-0004-000000000001'),
			this.organisationService.getAll()
		).subscribe(data => {
			console.log('what do you contain?', data);
		});
		this.userService.get('00000000-0000-0000-0004-000000000001').subscribe((data) => {
			this.user = data.records;
			this.initFormControls();
		});
	}

	onSubmit(): void {
		this.setUser();
		this.userService.edit(this.user);
		this.location.back();
	}

	back(): void {
		this.location.back();
	}


	// ------- Form related stuff ----------

	initFormControls(): void {
		this.initPasswordForm();
		this.initUserForm();
	}

	initPasswordForm(): void {
		this.passwordGroup = new FormGroup({
			'password': new FormControl(),
			'confirmPassword': new FormControl()
		}, this.validation.passwordMatch);
	}

	passwordInvalid(): string {
		return this.constants.notSamePasswordMessage;
	}

	initUserForm(): void {
		this.userForm = new FormGroup({
			'username': new FormControl(this.user.username, [
				Validators.required,
				Validators.email
			]),
			'fullname': new FormControl(this.user.fullname, Validators.required),
			'phone': new FormControl(this.user.phone),
			// 'organisations': new FormControl(this.organisatons),
			'password': this.passwordGroup
		});
	}


	setUser(): void {
		this.user.username = this.username.value;
		this.user.fullname = this.fullname.value;
		this.user.phone = this.phone.value;
		this.user.password = this.password.value.password;
	}

	get username(): any { return this.userForm.get('username'); }
	get fullname(): any { return this.userForm.get('fullname'); }
	get password(): any { return this.userForm.get('password'); }
	get phone(): any { return this.userForm.get('phone'); }
	get confirmPassword(): any { return this.userForm.get('confirmPassword'); }

}
