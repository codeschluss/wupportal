import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TableState } from 'app/models/table.state';
import { Response } from 'app/models/response';


@Injectable()
export class DataService {

	private endpoint: string = '/api/';
	private baseUrl: string;

	constructor(
		private http: HttpClient,
		private repository: string
	) {
		this.baseUrl = this.endpoint + repository;
	}

	public add(record: any): void {
		this.http.put(this.baseUrl + '/add/' + record.id, JSON.stringify(record))
			.subscribe();
	}

	public delete(record: any): void {
		this.http.delete(this.baseUrl + '/delete/' + record.id)
			.subscribe();
	}

	public edit(record: any): void {
		this.http.patch(this.baseUrl + '/' + record.id + '/', JSON.stringify(record))
			.subscribe();
	}

	public get(id: string): Observable<any> {
		return this.http.get(this.baseUrl + '/' + id).map(i => i as any);
	}

	public list(request: TableState): Observable<Response> {
		return this.http.post(this.baseUrl + '/list', JSON.stringify(request)).map(res => res as Response);
	}

}
