import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { User } from 'app/models/user';
import { Constants } from 'app/services/constants';
import { Error } from 'app/models/error';
import { Service } from 'app/services/service';
import { IDataService } from 'app/services/data.service.interface';
import { TableState } from 'app/models/table.state';

@Injectable()
export class UserService extends Service implements IDataService {

	private credentials: string = '';
	public currentUser: User = null;
	private baseUrl: string = '/api/users/';

	constructor(
		protected http: HttpClient,
		protected messageBar: MatSnackBar,
		private router: Router
	) {
		super(http, messageBar);
	}

	public add(record: any): Observable<any> {
		return this.httpPost(
			this.baseUrl,
			record,
			this.getBasicAuth());
	}

	public delete(recordID: any): Observable<any> {
		return this.httpDelete(
			this.baseUrl + recordID,
			this.getBasicAuth());
	}

	public edit(record: any): Observable<any> {
		return this.httpPatch(
			this.baseUrl + record.id,
			record,
			this.getBasicAuth()
		);
	}

	public get(id: string): Observable<any> {
		return this.httpGet(
			this.baseUrl + id,
			this.getBasicAuth(),
			this.getCurrentLanguage()
		);
	}

	public getAll(): Observable<any> {
		return this.httpGet(
			this.baseUrl,
			this.getBasicAuth(),
			this.getCurrentLanguage()
		);
	}

	public list(request: TableState): Observable<any> {
		return this.httpPost(
			this.baseUrl,
			request,
			this.getBasicAuth());
	}

	login(username: string, pwd: string): Observable<any> {
		const password = this.getPwd(pwd);
		const credentials = btoa(username + ':' + password);
		return this.httpPost(this.baseUrl + 'login', null, 'Basic ' + credentials, false)
			.map((response: User) => this.handleSuccessLogin(response, credentials))
			.catch(error => this.handleError(error));
	}

	handleSuccessLogin(response: User, credentials: string): void {
		if (response) {
			this.credentials = credentials;
			this.currentUser = new User(response);
		} else {
			this.redirectToLogin();
		}
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
			? this.currentUser.isOrgaAdmin()
			: false;
	}

	isApprovedProvider(): boolean {
		return this.currentUser
			? this.currentUser.isApproved()
			: false;
	}

	getBasicAuth(): string {
		return 'Basic ' + this.credentials;
	}

	getCurrentLanguage(): string {
		return 'de';
	}

	getPwd(password: string): string {
		return password
			? password
			: this.credentials ? atob(this.credentials).split(':')[1] : '';
	}



}
