import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/toPromise';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { DataSource } from '@angular/cdk/collections';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Model } from 'app/models/model';

@Injectable()
export abstract class Service<T extends Model> {

	protected abstract baseURL: string;

	constructor(protected http: HttpClient) { }

	public add(item: T): void {
		this.http.put(this.baseURL + '/edit/' + item.id, JSON.stringify(item))
			.subscribe();
	}

	public delete(item: T): void {
		this.http.delete(this.baseURL + '/edit/' + item.id)
			.subscribe();
	}

	public edit(item: T): void {
		this.http.post(this.baseURL + '/add/', JSON.stringify(item))
			.subscribe();
	}

	public get(id: string): Observable<T> {
		return this.http.get(this.baseURL + id).map(i => i as T);
	}

	public list(): Observable<T[]> {
		return this.http.get(this.baseURL).map(i => i as T[]);
	}

}
