import { Injectable } from '@angular/core';

import { Organisation } from '../common/model/organisation';
import { Service } from './service';

@Injectable()
export class OrgaService extends Service {

	getOrgas(): Promise<Organisation[]> {
		return this.http.get(this.basicURL + '/organisation', { headers: this.headers })
			.toPromise()
			.then(response => response.json().organisation as Organisation[])
			.catch(this.handleError);
	}
}
