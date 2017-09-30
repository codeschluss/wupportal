import { Injectable } from '@angular/core';

import { Service } from 'app/services/service';
import { Suburb } from 'app/models/suburb';

@Injectable()
export class SuburbService extends Service<Suburb> {

	public repoURL: string = 'suburbs/';

	getAllSuburbs(): Promise<Suburb[]> {
		return this.http.get(this.baseURL + this.repoURL, { headers: this.headers })
			.toPromise()
			.then(response => response.json().suburbs as Suburb[])
			.catch(this.handleError);
	}
}
