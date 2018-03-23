
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TableState } from 'app/models/table.state';
import { DataResponse } from 'app/models/data.response';
import { AuthenticationService } from 'app/services/authentication.service';
import { Service } from './service';
import { Error } from '../models/error';


@Injectable()
export class DataService extends Service {

	protected endpoint: string = '/api/';
	protected baseUrl: string;

	constructor(
		protected repository: string,
		protected http: HttpClient,
		protected authService: AuthenticationService,
		protected messageBar: MatSnackBar
	) {
		super(messageBar);
		this.baseUrl = this.endpoint + repository + '/';
	}

	public add(record: any): Observable<any> {
		return this.http.post(this.baseUrl, JSON.stringify(record), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		})
			.map(response => this.handleSuccess(response))
			.catch(error => this.handleError(error));
	}

	public delete(recordID: any): Observable<any> {
		return this.http.delete(this.baseUrl + recordID, {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		})
			.map(response => this.handleSuccess(response))
			.catch(error => this.handleError(error));
	}

	public edit(record: any): Observable<any> {
		return this.http.patch(this.baseUrl + record.id + '/', JSON.stringify(record), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		})
			.map(response => this.handleSuccess(response))
			.catch(error => this.handleError(error));
	}

	public get(id: string): Observable<any> {
		return this.http.get(this.baseUrl + id, {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		})
			.catch(error => this.handleError(error));
	}

	public list(request: TableState): Observable<any> {
		return this.http.post(this.baseUrl + 'list', JSON.stringify(request), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		}).map(res => res as DataResponse)
			.catch(error => this.handleError(error));
	}

	public getAll(): Observable<any> {
		return this.http.get(this.baseUrl, {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		})
			.catch(error => this.handleError(error));
	}

}
