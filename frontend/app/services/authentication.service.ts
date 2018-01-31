import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthResponse } from 'app/models/auth.response';
import { User } from 'app/models/user';
import { Constants } from 'app/services/constants';

@Injectable()
export class AuthenticationService implements CanActivate {

	private credentials: string = '';
	public currentUser: User = null;

	constructor(
		private router: Router,
		private http: HttpClient,
		private constants: Constants) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (state.url.includes(this.constants.userURL)) {
			return this.handleSuperUserRoute();
		}
		if (state.url.includes(this.constants.orgaAdminURL)) {
			return this.handleOrgaAdminRoute();
		}
		return this.handleProviderRoutes();
	}

	login(username: string, pwd: string): Observable<boolean> {
		const password = this.getPwd(pwd);
		const credentials = btoa(username + ':' + password);
		return this.http.post('/api/users/login',
			JSON.stringify({ username: username, password: password }), {
				headers: new HttpHeaders()
					.set('Content-Type', 'application/json')
					.set('Authorization', 'Basic ' + credentials)
			})
			.map((resp) => resp as AuthResponse) // TODO: Check for internal server errors
			.map((response: AuthResponse) => {
				return response.success
					? this.handleSuccessLogin(response, credentials)
					: false;
			});
	}

	handleSuccessLogin(response: AuthResponse, credentials: string): boolean {
		if (response.data) {
			this.credentials = credentials;
			this.currentUser = new User(response.data);
			return true;
		}
		return false;
	}

	logout(): void {
		this.currentUser = null;
		this.credentials = '';
	}

	handleProviderRoutes(): boolean {
		return this.currentUser
			? true
			: this.handleRedirect();
	}

	handleSuperUserRoute(): boolean {
		return this.isSuperUser()
			? true
			: this.handleRedirect();
	}

	handleOrgaAdminRoute(): boolean {
		return this.isOrganisationAdmin() || this.isSuperUser()
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

	isSuperUser(): boolean {
		return this.currentUser
			? this.currentUser.superuser
			: false;
	}

	isOrganisationAdmin(): boolean {
		return this.currentUser
			? this.currentUser.orgaAdmin
			: false;
	}

	basicAuthString(): string {
		return 'Basic ' + this.credentials;
	}

	getPwd(password: string): string {
		if (password) {
			return password;
		} else {
			return this.credentials ? atob(this.credentials).split(':')[1] : '';
		}
	}
}
