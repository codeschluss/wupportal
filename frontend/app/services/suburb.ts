import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Service } from 'app/services/service';
import { Suburb } from 'app/models/suburb';

@Injectable()
export class SuburbService extends Service<Suburb> {

	protected baseURL: string = 'suburbs';

	protected storable: boolean = true;

	protected syncable: boolean = true;

	protected synctime: number = 1000 * 120;

	public filter(query: string): Observable<Suburb[]> {
		return this.items.asObservable();
	}

}
