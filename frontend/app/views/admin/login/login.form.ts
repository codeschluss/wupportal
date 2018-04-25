import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from 'app/services/user.service';
import { Constants } from 'app/services/constants';

@Component({
	templateUrl: 'login.form.html',
	styleUrls: ['../admin.area.css', '../../../app.component.css']
})
export class LoginFormComponent {

	username: string = '';
	password: string = '';
	error: string;

	constructor(private location: Location,
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
		private constants: Constants) { }

	login(): void {
		this.userService.login(this.username, this.password)
			.subscribe(
				success => this.router.navigate(['/admin']),
				error => this.error = error.message
			);
	}
}
