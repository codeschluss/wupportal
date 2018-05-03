import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from 'app/services/user.service';
import { Constants } from 'app/services/constants';
import { ConfigurationService } from '../../../services/data.service.factory';
import { DataService } from '../../../services/data.service';

@Component({
	templateUrl: 'login.form.html',
	styleUrls: ['../admin.area.css', '../../../app.component.css']
})
export class LoginFormComponent {

	username: string = '';
	password: string = '';
	portalTitle: string = '';
	error: string;

	constructor(private location: Location,
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
		@Inject(ConfigurationService) private configurationService: DataService,
		public constants: Constants) {
		this.configurationService.getAll().subscribe(
			configs => { this.portalTitle = configs.find(item => item.item === 'portalName').value; });
	}

	login(): void {
		this.userService.login(this.username, this.password)
			.subscribe(
				success => this.router.navigate(['/admin']),
				error => this.error = error.message
			);
	}
}
