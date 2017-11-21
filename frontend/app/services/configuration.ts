import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Configuration } from 'app/models/configuration';
import { Service } from 'app/services/service';

@Injectable()
export class ConfigurationService extends Service<Configuration> {

	protected baseURL: string = '/configurations/';

	public get(query: string): Observable<Configuration> {
		return this.list().map((i) => i.find((j) => j.item === query));
	}

}
