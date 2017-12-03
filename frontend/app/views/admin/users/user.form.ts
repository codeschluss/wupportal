import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { DataServiceFactory, OrganisationService, UserService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { ValidationService } from 'app/services/validation.service';
import { Constants } from 'app/views/common/constants';
import { AuthenticationService } from 'app/services/authentication.service';

import { User } from 'app/models/user';
import { Organisation } from 'app/models/organisation';
import { Provider } from 'app/models/provider';


@Component({
	selector: 'user-form',
	templateUrl: 'user.form.html',
	styleUrls: ['user.form.css'],
	providers: [
		{ provide: UserService, useFactory: DataServiceFactory(UserService), deps: [HttpClient, AuthenticationService] },
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient, AuthenticationService] }
	]
})

export class UserFormComponent implements OnInit {

	protected user: User;
	protected userForm: FormGroup;
	protected passwordGroup: FormGroup;

	protected allOrganisations: Array<Organisation>;
	protected initialOrganisations: Array<string> = [];

	constructor(
		@Inject(UserService) public userService: DataService,
		@Inject(OrganisationService) public organisationService: DataService,
		public authService: AuthenticationService,
		public location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		public validation: ValidationService
	) { }


	onSubmit(): void {
		this.setUser();
		this.userService.edit(this.user)
			.map(data => data.records as User)
			.subscribe(user =>
				this.authService.login(this.user.username, this.user.password)
					.subscribe(succeeded =>
						succeeded ? this.location.back() : this.authService.redirectToLogin())
			);
		this.location.back();
	}

	setUser(): void {
		this.user.username = this.usernameCtrl.value;
		this.user.fullname = this.fullnameCtrl.value;
		this.user.phone = this.phoneCtrl.value;
		this.user.password = this.passwordCtrl.value;
	}

	back(): void {
		this.location.back();
	}

	passwordInvalid(): string {
		return this.constants.notSamePasswordMessage;
	}

	ngOnInit(): void {
		this.userService.get(this.authService.currentUser.id)
			.map(data => data.records as User)
			.subscribe(user => {
				this.user = user;
				this.initializeOrganisations(user.providers);
				this.initAllOrganisationsThenControls();
			});
	}

	initializeOrganisations(providers: Array<Provider>): void {
		for (const provider of providers) {
			this.initialOrganisations.push(provider.organisation.id);
		}
	}

	initAllOrganisationsThenControls(): void {
		this.organisationService.getAll()
			.map(value => value.records as Array<Organisation>)
			.subscribe(orgas => {
				this.initFormControls();
				this.allOrganisations = orgas;
			});
	}

	initFormControls(): void {
		this.initPasswordForm();
		this.initUserForm();
	}

	initPasswordForm(): void {
		this.passwordGroup = new FormGroup({
			'passwordCtrl': new FormControl(),
			'confirmPasswordCtrl': new FormControl()
		}, this.validation.passwordMatch);
	}

	initUserForm(): void {
		this.userForm = new FormGroup({
			'usernameCtrl': new FormControl(this.user.username, [
				Validators.required,
				Validators.email
			]),
			'fullnameCtrl': new FormControl(this.user.fullname, Validators.required),
			'phoneCtrl': new FormControl(this.user.phone),
			'organisationsCtrl': new FormControl(this.initialOrganisations),
			'password': this.passwordGroup
		});
	}

	get usernameCtrl(): any { return this.userForm.get('usernameCtrl'); }
	get fullnameCtrl(): any { return this.userForm.get('fullnameCtrl'); }
	get passwordCtrl(): any { return this.passwordGroup.get('passwordCtrl'); }
	get phoneCtrl(): any { return this.userForm.get('phoneCtrl'); }
	get organisationsCtrl(): any { return this.userForm.get('organisationsCtrl'); }
	get confirmPasswordCtrl(): any { return this.passwordGroup.get('confirmPasswordCtrl'); }

}
