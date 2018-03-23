import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from 'app/services/authentication.service';
import { TableState } from 'app/models/table.state';
import { DataService } from 'app/services/data.service';

@Injectable()
export class ProviderService extends DataService {

	constructor(
		protected http: HttpClient,
		protected authService: AuthenticationService,
		protected messageBar: MatSnackBar
	) {
		super('providers', http, authService, messageBar);
	}

	public getByOrganisation(organisationID: string, tableState?: TableState): Observable<any> {
		const request = tableState
			&& Object.assign(tableState, this.createProvidersParam(organisationID))
			|| this.createProvidersParam(organisationID);

		return this.http.post(this.baseUrl + 'getByOrganisation', JSON.stringify(request), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		});
	}

	createProvidersParam(organisationID: string): any {
		return { 'organisation': organisationID };
	}

	public getByUser(userID: string, admin?: boolean): Observable<any> {
		const request = admin
			&& Object.assign(this.createAdminParam(admin), this.createUserParam(userID))
			|| this.createUserParam(userID);

		return this.http.post(this.baseUrl + 'getByUser', JSON.stringify(request), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		});
	}

	createUserParam(userID: string): any {
		return { 'user': userID };

	}

	createAdminParam(admin: boolean): string[] {
		const adminParam: any = { 'admin': '' };
		adminParam.admin = admin;
		return adminParam;
	}

}
