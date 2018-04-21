import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from 'app/services/authentication.service';
import { Constants } from 'app/services/constants';

@Component({
	templateUrl: 'login.form.html',
	styleUrls: ['../admin.area.css', '../../../app.component.css']
})
export class LoginFormComponent implements OnInit {

	username: string = '';
	password: string = '';
	error: string;

	constructor(private location: Location,
		private router: Router,
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService,
		private constants: Constants) { }

	ngOnInit(): void {
		this.authenticationService.logout();
	}

	login(): void {
		this.authenticationService.login(this.username, this.password)
			.subscribe(
				success => this.router.navigate(['/admin']),
				error => this.error = error.message
			);
	}
}
