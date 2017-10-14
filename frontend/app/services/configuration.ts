import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Configuration } from 'app/models/configuration';
import { Service } from 'app/services/service';

@Injectable()
export class ConfigurationService extends Service<Configuration> {

	protected baseURL: string = 'configurations';

	protected storable: boolean = true;

	protected syncable: boolean = true;

	protected synctime: number = 1000 * 120;

	public filter(query: string): Observable<Configuration[]> {
		return this.items.map((i) => [
			i.find((j) => j.item === query) || new Configuration()
		]);
	}

}
