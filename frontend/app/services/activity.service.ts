import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from 'app/services/authentication.service';
import { TableState } from 'app/models/table.state';
import { DataResponse } from 'app/models/data.response';
import { DataService } from 'app/services/data.service';

@Injectable()
export class ActivityService extends DataService {

	constructor(
		protected http: HttpClient,
		protected authService: AuthenticationService,
		protected messageBar: MatSnackBar
	) {
		super('activities', http, authService, messageBar);
	}

	public getByProviders(tableState: TableState, providers: Array<string>): Observable<DataResponse> {
		const request = Object.assign(tableState, this.createProvidersParam(providers));
		return this.http.post(this.baseUrl + 'getByProviders', JSON.stringify(request), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		}).map(res => res as DataResponse);
	}

	createProvidersParam(providers: Array<string>): any {
		return { 'providers': providers };
	}

}
