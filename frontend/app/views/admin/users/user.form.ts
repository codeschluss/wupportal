import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/Rx';

import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { DataServiceFactory, OrganisationService, UserService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { ValidationService } from 'app/services/validation.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ProviderService } from 'app/services/provider.service';
import { Constants } from 'app/services/constants';

import { User } from 'app/models/user';
import { Organisation } from 'app/models/organisation';
import { Provider } from 'app/models/provider';

@Component({
	selector: 'user-form',
	templateUrl: 'user.form.html',
	styleUrls: ['user.form.css'],
	providers: [
		ProviderService,
		{ provide: UserService, useFactory: DataServiceFactory(UserService), deps: [HttpClient, AuthenticationService] },
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient, AuthenticationService] }
	]
})

export class UserFormComponent implements OnInit {

	protected user: User;
	protected userForm: FormGroup;
	protected passwordGroup: FormGroup;
	protected hasActivities: boolean = true;
	private userProviders: string[];

	protected allOrganisations: Array<Organisation>;
	protected initialOrganisations: Array<string> = [];
	protected toDeleteProviders: Array<string> = [];

	constructor(
		@Inject(UserService) public userService: DataService,
		@Inject(OrganisationService) public organisationService: DataService,
		public providerService: ProviderService,
		public authService: AuthenticationService,
		public location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		public validation: ValidationService
	) { }


	onSubmit(): void {
		this.setData();
		this.toDeleteProviders.length === 0
			? this.updateUser()
			: this.deleteProviders().subscribe(results => this.updateUser());
	}

	updateUser(): void {
		this.userService.edit(this.user)
			.map(data => data.records as User)
			.subscribe(user =>
				this.authService.login(this.user.username, this.user.password)
					.subscribe(succeeded =>
						succeeded ? this.location.back() : this.authService.redirectToLogin())
			);
	}

	deleteProviders(): Observable<any> {
		const list = [];
		for (const providerID of this.toDeleteProviders) {
			list.push(this.providerService.delete(providerID));
		}
		return forkJoin(list);
	}

	setData(): void {
		this.user.username = this.usernameCtrl.value;
		this.user.fullname = this.fullnameCtrl.value;
		this.user.phone = this.phoneCtrl.value;
		if (this.passwordCtrl.value) {
			this.user.password = this.passwordCtrl.value;
		}
		this.getProvidersToDelete();
		this.createProviders();
	}

	// TODO: Check for easier method...
	getProvidersToDelete(): void {
		this.user.providers = this.user.providers.filter(provider => {
			const deleted = !this.organisationsCtrl.value.includes(provider.organisation_id);
			if (deleted) {
				this.toDeleteProviders.push(provider.id);
			}
			return !deleted;
		});
	}

	// TODO: Check for easier method...
	createProviders(): void {
		outer:
		for (const orga_id of this.organisationsCtrl.value) {
			if (orga_id) {
				for (const intialProvider of this.user.providers) {
					if (intialProvider.organisation_id === orga_id) {
						intialProvider.organisation = undefined;
						intialProvider.user = undefined;
						continue outer;
					}
				}
				const provider = new Provider({});

				provider.organisation_id = orga_id;
				provider.user_id = this.user.id;
				provider.organisation = undefined;
				provider.user = undefined;

				this.user.providers.push(provider);
			}
		}
	}

	back(): void {
		this.location.back();
	}

	passwordInvalid(): string {
		return this.constants.notSamePasswordMessage;
	}

	ngOnInit(): void {
		this.userProviders = this.authService.currentUser.providers.map(provider => provider.id);
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
			'fullnameCtrl': new FormControl(this.user.fullname),
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
