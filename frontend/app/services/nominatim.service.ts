import { Injectable } from '@angular/core';

import { Address } from '../common/model/address';
import { Service } from './service';

@Injectable()
export class NominatimService extends Service {

	getGeoDates(string: string): Promise<JSON[]> {
		return this.http.get('http://nominatim.openstreetmap.org/search/' +
			string +
			'?format=json&addressdetails=1')
			.toPromise()
			.then(response => response.json() as JSON[]);
	}
}
