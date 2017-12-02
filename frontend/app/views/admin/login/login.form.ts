import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from 'app/services/authentication.service';
import { User } from 'app/models/user';

@Component({
	templateUrl: 'login.form.html'
})
export class LoginFormComponent implements OnInit {

	user: User = new User();
	loading: boolean = false;
	error: string = '';

	constructor(private location: Location,
		private router: Router,
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService) { }

	cancel(): void {
		this.location.back();
	}

	// fakeLogin(): void {
	// 	if (this.userNameInput === 'john' && this.passwordInput === 'doe') {
	// 		this.router.navigate(['/admin']);
	// 		console.log('you are now logged in');
	// 	} else {
	// 		console.log('login rejected');
	// 	}
	// }

	ngOnInit(): void {
		// reset login status
		this.authenticationService.logout();
	}

	login(): void {
		this.loading = true;
		this.authenticationService.login(this.user.username, this.user.password)
			.subscribe(result => {
				if (result) {
					console.log('worked!');
					this.router.navigate(['/admin']);
				} else {
					this.error = 'Username or password is incorrect';
					this.loading = false;
				}
			});
	}
}
