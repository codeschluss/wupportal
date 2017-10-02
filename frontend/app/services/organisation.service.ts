import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';

import { Organisation } from 'app/models/organisation';
import { DataService } from 'app/services/data.service';

@Injectable()
export class OrganisationService extends DataService<Organisation> {

	protected baseURL: string = '/organisations/'

	getOrganisations(): Promise<Organisation[]> {
		return this.http.get(this.baseURL, { headers: this.headers })
			.toPromise()
			.then(response => response.json().organisations as Organisation[])
			.catch(this.handleError);
	}

	postOrganisation(orga: Organisation) {
		return this.http.post(this.baseURL + 'add/',
			JSON.stringify(orga)
			, { headers: this.headers }
		).subscribe();
	}

	editOrganisation(organisation: Organisation) {
		return this.http.put(this.baseURL + 'edit/' +
			organisation.id,
			JSON.stringify(organisation)
			, { headers: this.headers }
		).subscribe(newOrganisation => organisation = newOrganisation.json());
	}

	deleteOrganisation(organisation: Organisation) {
		return this.http.delete(this.baseURL + 'delete/' +
			organisation.id
			, { headers: this.headers }
		).subscribe();
	}

	getOrganisation(id: string): Promise<Organisation> {
		return this.http.get(this.baseURL + 'view/' + id, { headers: this.headers })
			.toPromise()
			.then(response => response.json().organisation as Organisation)
			.catch(this.handleError);
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

	constructor(private organisationService: OrganisationService) {
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
