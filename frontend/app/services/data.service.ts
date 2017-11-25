import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TableSate } from 'app/models/table.state';
import { Model } from 'app/models/model';

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

	public add(record: any): Observable<any[]> {
		this.http.put(this.baseUrl + '/add/' + record.id, JSON.stringify(record))
			.subscribe();
	}

	public delete(record: any): Observable<any[]> {
		this.http.delete(this.baseUrl + '/delete/' + record.id)
			.subscribe();
	}

	public edit(record: T): Observable<any[]> {
		this.http.post(this.baseUrl + '/edit/', JSON.stringify(record))
			.subscribe();
	}

	public get(id: string): Observable<any> {
		return this.http.get(this.baseUrl + id).map(i => i as T);
	}

	public list(request: TableState): Observable<any[]> {
		return this.http.post(this.baseUrl, JSON.stringify(request)).map(i => i as T[]);
	}

}
