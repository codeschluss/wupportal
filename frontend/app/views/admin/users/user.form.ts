import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/Rx';

import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { ValidationService } from 'app/services/validation.service';
import { UserService } from 'app/services/user.service';
import { Constants } from 'app/services/constants';

import { User } from 'app/models/user';
import { Provider } from 'app/models/provider';

@Component({
	selector: 'user-form',
	templateUrl: 'user.form.html',
	styleUrls: ['user.form.css', '../admin.area.css', '../../../app.component.css']
})

export class UserFormComponent implements OnInit {

	public user: User;
	private userForm: FormGroup;
	private passwordGroup: FormGroup;
	private hasActivities: boolean = false;

	constructor(
		public userService: UserService,
		public location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		public validation: ValidationService
	) { }


	onSubmit(): void {
		this.setData();
		this.updateUser();
	}

	setData(): void {
		this.user.username = this.usernameCtrl.value;
		this.user.fullname = this.fullnameCtrl.value;
		this.user.phone = this.phoneCtrl.value;
		if (this.passwordCtrl.value) {
			this.user.password = this.passwordCtrl.value;
		}
	}

	updateUser(): void {
		this.userService.edit(this.user)
			.subscribe(user =>
				this.userService.login(this.user.username, this.user.password)
					.subscribe(
						() => this.user = this.userService.currentUser,
						error => this.userService.redirectToLogin())
			);
	}

	passwordInvalid(): string {
		return this.constants.notSamePasswordMessage;
	}

	getUserProviders(): Array<string> {
		return this.user.providers.map(provider => provider.id);
	}

	ngOnInit(): void {
		this.userService.get(this.userService.currentUser.id)
			.subscribe(user => {
				this.user = user;
				this.initFormControls();
				this.hasActivities = this.user.providers.length !== 0;
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
			'password': this.passwordGroup
		});
	}

	get usernameCtrl(): any { return this.userForm.get('usernameCtrl'); }
	get fullnameCtrl(): any { return this.userForm.get('fullnameCtrl'); }
	get passwordCtrl(): any { return this.passwordGroup.get('passwordCtrl'); }
	get phoneCtrl(): any { return this.userForm.get('phoneCtrl'); }
	get confirmPasswordCtrl(): any { return this.passwordGroup.get('confirmPasswordCtrl'); }

}
