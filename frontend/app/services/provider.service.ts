import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { UserService } from 'app/services/user.service';
import { TableState } from 'app/models/table.state';
import { DataService } from 'app/services/data.service';

@Injectable()
export class ProviderService extends DataService {

	constructor(
		protected http: HttpClient,
		protected userService: UserService,
		protected messageBar: MatSnackBar
	) {
		super('providers', http, userService, messageBar);
	}

	public getByOrganisation(organisationID: string, tableState?: TableState): Observable<any> {
		const request = tableState
			&& Object.assign(tableState, this.createProvidersParam(organisationID))
			|| this.createProvidersParam(organisationID);

		return this.httpPost(
			this.baseUrl + 'getByOrganisation',
			request,
			this.userService.getBasicAuth()
		);
	}

	createProvidersParam(organisationID: string): any {
		return { 'organisation': organisationID };
	}

	public getByUser(userID: string, admin?: boolean): Observable<any> {
		const request = admin
			&& Object.assign(this.createAdminParam(admin), this.createUserParam(userID))
			|| this.createUserParam(userID);

		return this.httpPost(
			this.baseUrl + 'getByUser',
			request,
			this.userService.getBasicAuth()
		);
	}

	createUserParam(userID: string): any {
		return { 'user': userID };
	}

	createAdminParam(admin: boolean): any {
		return { 'admin': admin };
	}

}
