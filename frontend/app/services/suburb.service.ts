import { Injectable } from '@angular/core';

import { DataService } from 'app/services/data.service';
import { Suburb } from 'app/models/suburb';

@Injectable()
export class SuburbService extends DataService<Suburb> {

	protected baseURL: string = '/suburbs/'

	getAllSuburbs(): Promise<Suburb[]> {
		return this.http.get(this.baseURL, { headers: this.headers })
			.toPromise()
			.then(response => response.json().suburbs as Suburb[])
			.catch(this.handleError);
	}
}
