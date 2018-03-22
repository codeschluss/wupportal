import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { DataServiceFactory, UserService, OrganisationService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { ValidationService } from 'app/services/validation.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ProviderService } from 'app/services/provider.service';
import { Constants } from 'app/services/constants';

import { User } from 'app/models/user';
import { Provider } from 'app/models/provider';
import { Organisation } from 'app/models/organisation';

@Component({
	selector: 'register-user',
	templateUrl: 'register.form.html',
	styleUrls: ['user.form.css']
})

export class RegisterFormComponent implements OnInit {

	private user: User;
	private userForm: FormGroup;
	private passwordGroup: FormGroup;
	private allOrganisations: Array<Organisation>;

	constructor(
		@Inject(UserService) public userService: DataService,
		@Inject(OrganisationService) public organisationService: DataService,
		public providerService: ProviderService,
		public authService: AuthenticationService,
		public location: Location,
		public constants: Constants,
		public validation: ValidationService
	) { }

	onSubmit(): void {
		this.setData();
		this.userService.add(this.user)
			.subscribe(() => {
				this.authService.redirectToLogin();
			});
	}

	passwordInvalid(): string {
		return this.constants.notSamePasswordMessage + ' ' +
			this.constants.orAreEmptyMessage;
	}

	back(): void {
		this.location.back();
	}

	setData(): void {
		this.user.username = this.usernameCtrl.value;
		this.user.fullname = this.fullnameCtrl.value;
		this.user.phone = this.phoneCtrl.value;
		if (this.passwordCtrl.value) {
			this.user.password = this.passwordCtrl.value;
		}
		this.createProviders();
	}

	createProviders(): void {
		if (this.organisationsCtrl.value) {
			for (const orga_id of this.organisationsCtrl.value) {
				if (orga_id) {
					const provider = new Provider();
					provider.organisation_id = orga_id;
					provider.user_id = this.user.id;
					provider.organisation = undefined;
					provider.user = undefined;
					this.user.providers.push(provider);
				}
			}
		}
	}

	ngOnInit(): void {
		this.user = new User();
		this.initAllOrganisationsThenControls();
	}

	initAllOrganisationsThenControls(): void {
		this.organisationService.getAll()
			.map(value => value as Array<Organisation>)
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
			'passwordCtrl': new FormControl('', [
				Validators.required
			]),
			'confirmPasswordCtrl': new FormControl('', [
				Validators.required
			]),
		}, this.validation.passwordMatch);
	}

	initUserForm(): void {
		this.userForm = new FormGroup({
			'usernameCtrl': new FormControl(this.user.username, [
				Validators.required,
				Validators.email
			]),
			'fullnameCtrl': new FormControl(this.user.fullname),
			'phoneCtrl': new FormControl(this.user.phone),
			'organisationsCtrl': new FormControl(),
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
