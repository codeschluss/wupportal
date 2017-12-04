import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthenticationService } from 'app/services/authentication.service';
import { TableState } from 'app/models/table.state';
import { DataResponse } from 'app/models/data.response';
import { DataService } from 'app/services/data.service';

@Injectable()
export class ActivityService extends DataService {

	constructor(
		protected http: HttpClient,
		protected authService: AuthenticationService
	) {
		super(http, 'activities', authService);
	}


	public getByProviders(tableState: TableState): Observable<DataResponse> {
		const request = Object.assign(tableState, this.createProvidersList());
		console.log(request);
		return this.http.post(this.baseUrl + 'getByProviders', JSON.stringify(request), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		}).map(res => res as DataResponse);
	}

	createProvidersList(): string[] {
		const providerRequest: any = { 'providers': [] };
		providerRequest.providers = this.authService.currentUser.providers.map(provider => provider.id);
		return providerRequest;
	}

}
