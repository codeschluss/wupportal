import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Organisation } from 'app/models/organisation';
import { Service } from 'app/services/service';

@Injectable()
export class OrganisationService extends Service<Organisation> {

	protected baseURL: string = 'organisations';

	protected storable: boolean = true;

	protected syncable: boolean = true;

	protected synctime: number = 1000 * 120;

	public filter(query: string): Observable<Organisation[]> {
		return this.items.asObservable();
	}

}
