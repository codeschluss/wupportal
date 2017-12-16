import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthenticationService } from 'app/services/authentication.service';
import { TableState } from 'app/models/table.state';
import { DataResponse } from 'app/models/data.response';
import { DataService } from 'app/services/data.service';

@Injectable()
export class ProviderService extends DataService {

	constructor(
		protected http: HttpClient,
		protected authService: AuthenticationService
	) {
		super(http, 'providers', authService);
	}

	public getByOrganisation(organisationID: string, tableState?: TableState): Observable<DataResponse> {
		const request = tableState
			&& Object.assign(tableState, this.createProvidersParam(organisationID))
			|| this.createProvidersParam(organisationID);

		return this.http.post(this.baseUrl + 'getByOrganisation', JSON.stringify(request), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		}).map(res => res as DataResponse);
	}

	createProvidersParam(organisationID: string): string[] {
		const orgaParam: any = { 'organisation': '' };
		orgaParam.organisation = organisationID;
		return orgaParam;
	}

	public getByUser(userID: string, admin?: boolean): Observable<DataResponse> {
		const request = admin
			&& Object.assign(this.createAdminParam(admin), this.createUserParam(userID))
			|| this.createUserParam(userID);

		return this.http.post(this.baseUrl + 'getByUser', JSON.stringify(request), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		}).map(res => res as DataResponse);
	}

	createUserParam(userID: string): string[] {
		const userParam: any = { 'user': '' };
		userParam.user = userID;
		return userParam;
	}

	createAdminParam(admin: boolean): string[] {
		const adminParam: any = { 'admin': '' };
		adminParam.admin = admin;
		return adminParam;
	}

}
