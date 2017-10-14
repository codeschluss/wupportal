import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/toPromise';

import { Subject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { DataSource } from '@angular/cdk/collections';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Model } from 'app/models/model';

@Injectable()
export abstract class Service<T extends Model> extends DataSource<T> {

	protected items: Subject<T[]> = new Subject<T[]>([]);

	protected timer: any = null;

	protected abstract baseURL: string;

	protected abstract storable: boolean;

	protected abstract syncable: boolean;

	protected abstract synctime: number;

	public abstract filter(query: string): Observable<T[]>;

	constructor(protected http: Http) { super(); }

	public connect(): Observable<T[]> {
		if (this.items.observers.length) { return this.items.asObservable(); }

		const mem = this.constructor.name + 'LocalStorage';
		this.storable = this.storable && typeof localStorage !== 'undefined';

		if (this.storable) {
			(JSON.parse(localStorage.getItem(mem)) as string[] || []).forEach((i) => {
				this.items.value.push(JSON.parse(localStorage.getItem(i)) as T);
			});

			this.items.skip(1).subscribe((next) => {
				localStorage.setItem(mem, JSON.stringify(next.map((i) => i.id)));
				next.forEach((i) => { localStorage.setItem(i.id, JSON.stringify(i)); });
			});
		}

		if (this.syncable) { this.synchronise(); }
		return this.items.asObservable();
	}

	public disconnect(): void  {
		if (this.items.observers.length) { return; }
		if (this.syncable) { clearTimeout(this.timer); }
		this.items.complete();
	}

	public get(id: string): Observable<T> {
		return this.items.map((i) => i.find((j) => id === j.id));
	}

	// public remove(item: T): void {
	// 	this.http.delete(this.baseURL + '/edit/' + item.id)
	// 		.toPromise().then(() => {
	// 			this.items.next(this.items.value.filter((i) => item.id !== i.id));
	// 		});
	// }

	// public save(item: T): void {
	// 	this.http.put(this.baseURL + '/edit/' + item.id, JSON.stringify(item))
	// 		.toPromise().then((i)  => {
	// 			this.items.next(this.items.value.concat(i.json() as T));
	// 		});
	// }

	// public update(item: T): void {
	// 	this.http.post(this.baseURL + '/add/', JSON.stringify(item))
	// 		.toPromise().then((i) => i.json() as T).then((i) => {
	// 			this.items.next(this.items.value.map((j) => i.id === j.id ? i : j));
	// 		});
	// }

	protected epoch(date: Date = new Date(Date.now())): number {
		return Math.round(new Date(date).getTime() / 1000);
	}

	protected modified(): number {
		switch (this.items.value.length) {
			case 0: return 0;
			case 1: return this.epoch(this.items.value.pop().modified);
			default: return this.epoch(this.items.value.reduce((i, j) =>
				this.epoch(j.modified) > this.epoch(i.modified) ? i : j).modified);
		}
	}

	protected synchronise(): void {
		this.timer = setTimeout(() => { this.synchronise(); }, this.synctime);
		this.http.get(this.baseURL + '/sync/' + this.modified())
			.toPromise().then((i) => i.json() as T[]).then((i) => { if (i.length) {
				this.items.next(this.items.value.concat(i)); }
			});
	}

}
