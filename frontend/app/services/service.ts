import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';

import { DataSource } from '@angular/cdk/collections';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Model } from 'app/models/model';

@Injectable()
export class Service<T extends Model> extends DataSource<T> {

	public baseURL: string = '/';

	public repoURL: string = '';

	public syncURL: string = 'sync/';

	protected headers: Headers = new Headers({
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	});

	private collection: T[] = [];

	constructor(protected http: Http) {
		super();

		let self = this.constructor.name;
		let localCollection = JSON.parse(window.localStorage.getItem(self)) as T[];

		console.log(self);
		console.log(localCollection);
		this.sync();
	}

	public connect(): Observable<T[]> {
		return Observable.of(this.collection);
	}

	public disconnect() { }

	public filter(model: Model): Observable<T[]> {
		return Observable.of(this.collection);
	}

	public remove(model: Model): void { }

	public save(model: Model): void { }

	// TODO: Only for prototyping
	protected handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		console.log(error.json());
		return Promise.reject(error.message || error);
	}

	private modified(): number {
		switch(this.collection.length) {
			case 0: return 0;
			case 1: return this.collection.pop().modified.getTime() / 1000;
			default: return this.collection.reduce((i, j) =>
				i.modified.getTime() > j.modified.getTime() ? i : j
			).modified.getTime() / 1000;
		}
	}

	private sync(): void {
		// let url: string = this.baseURL + this.self().repoURL + this.syncURL;
		// console.log(url);

		// this.http.get(url + this.modified()).toPromise()
			// .then(response => console.log(response.json()));
				// this.collection = response.json() as T[]);
	}

}
