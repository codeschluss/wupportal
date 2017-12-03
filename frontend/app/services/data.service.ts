import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TableState } from 'app/models/table.state';
import { DataResponse } from 'app/models/data.response';
import { AuthenticationService } from 'app/services/authentication.service';


@Injectable()
export class DataService {

	private endpoint: string = '/api/';
	private baseUrl: string;

	constructor(
		private http: HttpClient,
		private repository: string,
		private authService: AuthenticationService
	) {
		this.baseUrl = this.endpoint + repository + '/';
	}

	public add(record: any): Observable<any> {
		return this.http.post(this.baseUrl, JSON.stringify(record), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		});
	}

	public delete(record: any): void {
		this.http.delete(this.baseUrl + 'delete/' + record.id, {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		}).subscribe();
	}

	public edit(record: any): void {
		this.http.patch(this.baseUrl + record.id + '/', JSON.stringify(record), {
			headers: new HttpHeaders()
				.set('Authorization', this.authService.basicAuthString())
		}).subscribe();
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
		return this.http.get(this.baseUrl).map(res => res as any);
	}

}
