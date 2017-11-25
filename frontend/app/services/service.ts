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

	protected baseURL: string = '/api/';

	protected abstract url: string;

	constructor(protected http: HttpClient) { }

	public add(item: T): void {
		this.http.put(this.getUrl() + '/add/' + item.id, JSON.stringify(item))
			.subscribe();
	}

	public delete(item: T): void {
		this.http.delete(this.getUrl() + '/delete/' + item.id)
			.subscribe();
	}

	public edit(item: T): void {
		this.http.post(this.getUrl() + '/edit/', JSON.stringify(item))
			.subscribe();
	}

	public get(id: string): Observable<T> {
		return this.http.get(this.getUrl() + id).map(i => i as T);
	}

	public list(): Observable<T[]> {
		return this.http.get(this.getUrl()).map(i => i as T[]);
	}

	public getUrl(): string {
		return this.baseURL + this.url;
	}

}
