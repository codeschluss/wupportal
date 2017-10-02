import 'rxjs/add/observable/of';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/toPromise';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { DataSource } from '@angular/cdk/collections';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Model } from 'app/models/model';

@Injectable()
export abstract class DataService<T extends Model> extends DataSource<T> {

	// TODO: Legacy {
	protected headers: Headers = new Headers({
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	});
	// }

	// TODO: Only for prototyping {
	protected handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		console.log(error.json());
		return Promise.reject(error.message || error);
	}
	// }

	protected abstract baseURL: string;

	private items: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

	private timeout: any = null;

	constructor(protected http: Http) {
		super();

		// TODO: remove hack {
		this.connect();
		// }
	}

	public connect(): Observable<T[]> {
		let self = this.constructor.name;
		let ids = JSON.parse(window.localStorage.getItem(self)) as string[];
		if (ids && ids.length) ids.forEach((i) => {
			this.items.value.push(JSON.parse(window.localStorage.getItem(i)) as T);
		});

		this.items.skip(1).subscribe((items) => {
			let ids = items.map((i) => { return i.id; });

			window.localStorage.setItem(self, JSON.stringify(ids));
			items.forEach((i) => {
				window.localStorage.setItem(i.id, JSON.stringify(i));
			});
		});

		// TODO: remove hack {
		this.timeout = window.setTimeout(() => { this.synchronise(); }, 100);
		// }

		return this.items.asObservable();
	}

	public disconnect(): void  {
		// TODO: remove hack {
		window.clearTimeout(this.timeout);
		// }

		this.items.complete();
	}

	public remove(item: T): void {
		this.items.next(this.items.value.splice(this.items.value.findIndex((i) => {
			return item.id === i.id;
		}), 1));
	}

	public save(item: T): void {
		this.items.next(this.items.value.concat(item));
	}

	public update(item: T): void {
		this.items.next(this.items.value.splice(this.items.value.findIndex((i) => {
			return item.id === i.id;
		}), 1, item));
	}

	protected modified(): number {
		switch(this.items.value.length) {
			case 0: return 0;
			case 1: return new Date(this.items.value.pop().modified).getTime() / 1000;
			default: return new Date(this.items.value.reduce((i, j) => {
				let prev = new Date(j.modified).getTime() / 1000;
				let next = new Date(i.modified).getTime() / 1000;
				return prev > next ? i : j;
			}).modified).getTime() / 1000;
		}
	}

	protected synchronise(): void {
		let syncURL = this.baseURL + 'sync/' + this.modified();

		// TODO: remove hack {
		this.timeout = window.setTimeout(() => { this.synchronise(); }, 1000 * 180);
		// }

		this.http.get(syncURL).toPromise().then((response) => {
			this.items.next(this.items.value.concat(response.json() as T[]));
		});
	}

}
