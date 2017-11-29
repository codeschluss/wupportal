import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

import { DataServiceFactory, UserService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { User } from 'app/models/user';

import { Constants } from 'app/views/common/constants';

@Component({
	selector: 'edit-user',
	templateUrl: 'user.form.html',
	providers: [
		{ provide: UserService, useFactory: DataServiceFactory(UserService), deps: [HttpClient] }
	]
})

export class UserFormComponent implements OnInit {

	user: User;

	constructor(
		@Inject(UserService) private service: DataService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants
	) { }

	// TODO: Get current user in the local storage
	ngOnInit(): void {
		this.service.get('00000000-0000-0000-0004-000000000001').subscribe((data) => this.user = data.records);
	}

	onSubmit(): void {
		this.service.edit(this.user);
		this.location.back();
	}

	back(): void {
		this.location.back();
	}

}
