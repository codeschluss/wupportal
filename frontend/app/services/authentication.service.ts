import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthResponse } from 'app/models/auth.response';
import { User } from 'app/models/user';

@Injectable()
export class AuthenticationService implements CanActivate {

	constructor(
		private router: Router,
		private http: HttpClient) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.getLocalStorage()) {
			// logged in so return true
			return true;
		}
		// not logged in so redirect to login page
		this.router.navigate(['/login']);
		return false;
	}

	login(username: string, password: string): Observable<boolean> {
		const credentials = btoa(username + ':' + password);
		return this.http.post('/api/users/login',
			JSON.stringify({ username: username, password: password }), {
				headers: new HttpHeaders()
					.set('Content-Type', 'application/json')
					.set('Authorization', 'Basic ' + credentials)
			})
			.map((resp) => resp as AuthResponse) // Check for internal server errors
			.map((response: AuthResponse) => {
				console.log('response', response);
				return response.success
					? this.handleSuccessLogin(response, credentials)
					: false;
			});
	}

	handleSuccessLogin(response: AuthResponse, credentials: string): boolean {
		if (response.data) {
			localStorage.setItem('current',
				JSON.stringify({
					credentials: credentials,
					user: response.data
				}));
			return true;
		}
		return false;
	}

	logout(): void {
		localStorage.removeItem('current');
	}

	basicAuthString(): string {
		return 'Basic ' + this.getLocalStorage().credentials;
	}

	get currentUser(): User {
		return this.getLocalStorage().user;
	}

	getLocalStorage(): any {
		return JSON.parse(localStorage.getItem('current'));
	}

}
