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
			this.getHeader());
	}

	public delete(recordID: any): Observable<any> {
		return this.httpDelete(
			this.baseUrl + recordID,
			this.getHeader());
	}

	public edit(record: any): Observable<any> {
		return this.httpPatch(
			this.baseUrl + record.id,
			record,
			this.getHeader()
		);
	}

	public get(id: string): Observable<any> {
		return this.httpGet(
			this.baseUrl + id,
			this.getHeader()
		);
	}

	public getAll(): Observable<any> {
		return this.httpGet(
			this.baseUrl,
			this.getHeader()
		);
	}

	public list(request: TableState): Observable<any> {
		return this.httpPost(
			this.baseUrl + 'list',
			request,
			this.getHeader());
	}

	public login(username: string, pwd: string): Observable<any> {
		const password = this.getPwd(pwd);
		this.credentials = btoa(username + ':' + password);
		return this.httpPost(
			this.baseUrl + 'login',
			null,
			this.getHeader()
		)
			.map((response: User) => this.currentUser = new User(response));
	}

	public redirectToLogin(): void {
		this.router.navigate(['/login']);
	}

	public isSuperUser(): boolean {
		return this.currentUser
			? this.currentUser.superuser
			: false;
	}

	public isOrganisationAdmin(): boolean {
		return this.currentUser
			? this.currentUser.isOrgaAdmin()
			: false;
	}

	public isApprovedProvider(): boolean {
		return this.currentUser
			? this.currentUser.isApproved()
			: false;
	}

	public getPwd(password: string): string {
		return password
			? password
			: this.credentials ? atob(this.credentials).split(':')[1] : '';
	}
	private getHeader(): HttpHeaders {
		return new HttpHeaders()
			.set('Authorization', this.getBasicAuth())
			.set('Accept-Language', this.getCurrentLanguage())
			.set('Cache-Control', 'no-cache');
	}


	public getBasicAuth(): string {
		return 'Basic ' + this.credentials;
	}

	public getCurrentLanguage(): string {
		const storedLanguage = window.localStorage.getItem('accept-language-wupportal');
		return storedLanguage
			? storedLanguage
			: 'de';
	}

	public setCurrentLanguage(language: string): void {
		window.localStorage.setItem('accept-language-wupportal', language);
	}

}
