import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from 'app/services/authentication.service';
import { User } from 'app/models/user';
import { Constants } from 'app/services/constants';

@Component({
	templateUrl: 'login.form.html',
	styleUrls: ['./login.form.css']
})
export class LoginFormComponent implements OnInit {

	user: User = new User({});
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
		this.authenticationService.login(this.user.username, this.user.password)
			.subscribe(result => {
				if (result) {
					this.router.navigate(['/admin']);
				} else {
					this.error = this.constants.wrongCredentialsMessage;
				}
			});
	}
}
