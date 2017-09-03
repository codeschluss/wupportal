import { Injectable } from '@angular/core';

import { Suburb } from '../common/model/suburb';
import { Service } from './service';

@Injectable()
export class SuburbService extends Service {

	getAllSuburbs(): Promise<Suburb[]> {
		return this.http.get(this.baseURL + 'suburbs/', { headers: this.headers })
			.toPromise()
			.then(response => response.json().suburbs as Suburb[])
			.catch(this.handleError);
	}
}
