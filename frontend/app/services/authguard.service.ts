import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { User } from 'app/models/user';
import { Constants } from 'app/services/constants';
import { Error } from 'app/models/error';
import { UserService } from 'app/services/user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(
		private router: Router,
		private constants: Constants,
		private userService: UserService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (state.url.includes(this.constants.userURL)) {
			return this.handleSuperUserRoute();
		}
		if (state.url.includes(this.constants.orgaAdminURL)) {
			return this.handleOrgaAdminRoute();
		}
		return this.handleProviderRoutes();
	}

	handleProviderRoutes(): boolean {
		return this.userService.currentUser
			? true
			: this.handleRedirect();
	}

	handleSuperUserRoute(): boolean {
		return this.userService.isSuperUser()
			? true
			: this.handleRedirect();
	}

	handleOrgaAdminRoute(): boolean {
		return this.userService.isOrganisationAdmin() || this.userService.isSuperUser()
			? true
			: this.handleRedirect();
	}

	handleRedirect(): boolean {
		this.redirectToLogin();
		return false;
	}

	redirectToLogin(): void {
		this.router.navigate(['/login']);
	}
}
