import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TableState } from 'app/models/table.state';
import { DataResponse } from 'app/models/data.response';
import { AuthenticationService } from 'app/services/authentication.service';
import { Service } from './service';


@Injectable()
export class DataService extends Service {

	protected endpoint: string = '/api/';
	protected baseUrl: string;

	constructor(
		protected http: HttpClient,
		protected repository: string,
		protected authService: AuthenticationService
	) {
		super();
		this.baseUrl = this.endpoint + repository + '/';
	}

	public add(record: any): Observable<any> {
		return this.http.post(this.baseUrl, JSON.stringify(record), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		});
	}

	public delete(recordID: any): Observable<any> {
		return this.http.delete(this.baseUrl + recordID, {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		});
	}

	public edit(record: any): Observable<any> {
		return this.http.patch(this.baseUrl + record.id + '/', JSON.stringify(record), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		});
	}

	public get(id: string): Observable<any> {
		return this.http.get(this.baseUrl + id, {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		}).map(i => i as any);
	}

	public list(request: TableState): Observable<DataResponse> {
		return this.http.post(this.baseUrl + 'list', JSON.stringify(request), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		}).map(res => res as DataResponse);
	}

	public getAll(): Observable<any> {
		return this.http.get(this.baseUrl, {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		});
	}

}
