import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthResponse } from 'app/models/auth.response';
import { User } from 'app/models/user';
import { Constants } from 'app/services/constants';
import { Error } from 'app/models/error';
import { Service } from './service';

@Injectable()
export class AuthenticationService extends Service implements CanActivate {

	private credentials: string = '';
	public currentUser: User = null;

	constructor(
		private router: Router,
		private http: HttpClient,
		private constants: Constants) {
		super();
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

	login(username: string, pwd: string): Observable<any> {
		const password = this.getPwd(pwd);
		const credentials = btoa(username + ':' + password);
		return this.http.post('/api/users/login', null, {
			headers: new HttpHeaders()
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Basic ' + credentials)
		})
			.map((resp) => resp as AuthResponse)
			.map((response: AuthResponse) => this.handleSuccessLogin(response, credentials))
			.catch((e: any) => this.handleError(e));
	}

	handleSuccessLogin(response: AuthResponse, credentials: string): void {
		if (response.data) {
			this.credentials = credentials;
			this.currentUser = new User(response.data);
		} else {
			this.redirectToLogin();
		}
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
		return password
			? password
			: this.credentials ? atob(this.credentials).split(':')[1] : '';
	}
}
