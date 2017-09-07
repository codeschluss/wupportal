import { Injectable } from '@angular/core';

import { Organisation } from '../common/model/organisation';
import { Service } from './service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';


@Injectable()
export class OrgaService extends Service {

	getOrganisations(): Promise<Organisation[]> {
		return this.http.get(this.baseURL + 'organisations/', { headers: this.headers })
			.toPromise()
			.then(response => response.json().organisations as Organisation[])
			.catch(this.handleError);
	}

	postOrganisation(orga: Organisation) {
		return this.http.post(this.baseURL + 'organisations/add/',
			JSON.stringify(orga)
			, { headers: this.headers }
		).subscribe();
	}

	editOrganisation(organisation: Organisation) {
		return this.http.put(this.baseURL + 'organisations/edit/' +
			organisation.id,
			JSON.stringify(organisation)
			, { headers: this.headers }
		).subscribe(newOrganisation => organisation = newOrganisation.json());
	}

	deleteOrganisation(organisation: Organisation) {
		return this.http.delete(this.baseURL + 'organisations/delete/' +
			organisation.id
			, { headers: this.headers }
		).subscribe();
	}

	getOrganisationsDatabase(): OrganisationsDatabase {
		return new OrganisationsDatabase(this);
	}

	getOrganisationsDataSource(): OrganisationsDataSource {
		return new OrganisationsDataSource(new OrganisationsDatabase(this));
	}
}

export class OrganisationsDatabase {
	public organisations: Organisation[];
	dataChange: BehaviorSubject<Organisation[]> = new BehaviorSubject<Organisation[]>([]);

	constructor(private organisationService: OrgaService) {
		this.organisations = new Array();
		this.organisationService.getOrganisations().then(organisations => {
			organisations.forEach(organisation => {
				this.organisations.push(organisation);
				this.dataChange.next(this.organisations);
			});
		});
	}
	get change(): BehaviorSubject<Organisation[]> { return this.dataChange; }
	get data(): Organisation[] { return this.dataChange.value; }
}

export class OrganisationsDataSource extends DataSource<any> {
	_filterChange = new BehaviorSubject('');
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }

	constructor(private _organisationsDatabase: OrganisationsDatabase) {
		super();
	}

	connect(): Observable<Organisation[]> {
		const displayDataChanges = [
			this._organisationsDatabase.dataChange,
			this._filterChange,
		];
		return Observable.merge(...displayDataChanges).map(() => {
			return this._organisationsDatabase.data.slice().filter((organisation: Organisation) => {
				const searchStr = (organisation.name).toLowerCase();
				return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
			});
		});
	}

	disconnect() { }
}
