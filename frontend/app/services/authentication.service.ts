import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthResponse } from 'app/models/auth.response';
import { User } from 'app/models/user';

@Injectable()
export class AuthenticationService implements CanActivate {

	private credentials: string = '';
	public currentUser: User = null;

	constructor(
		private router: Router,
		private http: HttpClient) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.currentUser) {
			// logged in so return true
			return true;
		}
		// not logged in so redirect to login page
		this.redirectToLogin();
		return false;
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
			this.currentUser = response.data;
			return true;
		}
		return false;
	}

	logout(): void {
		this.currentUser = null;
		this.credentials = '';
	}

	basicAuthString(): string {
		return 'Basic ' + this.credentials;
	}

	redirectToLogin(): void {
		this.router.navigate(['/login']);
	}

	getPwd(password: string): string {
		if (password) {
			return password;
		} else {
			return this.credentials ? atob(this.credentials).split(':')[1] : '';
		}
	}
}
