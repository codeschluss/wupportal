import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { UserService } from 'app/services/user.service';
import { TableState } from 'app/models/table.state';
import { DataResponse } from 'app/models/data.response';
import { DataService } from 'app/services/data.service';

@Injectable()
export class ActivityService extends DataService {

	constructor(
		protected http: HttpClient,
		protected userService: UserService,
		protected messageBar: MatSnackBar
	) {
		super('activities', http, userService, messageBar);
	}

	public getByProviders(tableState: TableState, providers: Array<string>): Observable<DataResponse> {
		const request = Object.assign(tableState, this.createProvidersParam(providers));
		return this.httpPost(
			this.baseUrl + 'getByProviders',
			request,
			this.getHeader()
		);
	}

	createProvidersParam(providers: Array<string>): any {
		return { 'providers': providers };
	}

}
