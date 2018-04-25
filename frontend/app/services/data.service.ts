
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TableState } from 'app/models/table.state';
import { DataResponse } from 'app/models/data.response';
import { UserService } from 'app/services/user.service';
import { Service } from 'app/services/service';
import { Error } from 'app/models/error';
import { IDataService } from 'app/services/data.service.interface';


@Injectable()
export class DataService extends Service implements IDataService {

	protected endpoint: string = '/api/';
	protected baseUrl: string;

	constructor(
		protected repository: string,
		protected http: HttpClient,
		protected userService: UserService,
		protected messageBar: MatSnackBar) {
		super(http, messageBar);
		this.baseUrl = this.endpoint + repository + '/';
	}

	public add(record: any): Observable<any> {
		return this.httpPost(
			this.baseUrl,
			record,
			this.getHeader(),
			true);
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

	protected getHeader(): HttpHeaders {
		return new HttpHeaders()
			.set('Authorization', this.userService.getBasicAuth())
			.set('Accept-Language', this.userService.getCurrentLanguage());
	}

}
