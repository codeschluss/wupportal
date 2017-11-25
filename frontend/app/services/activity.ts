import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Activity } from 'app/models/activity';
import { Address } from 'app/models/address';
import { Service } from 'app/services/service';

@Injectable()
export class ActivityService extends Service<Activity> {

	protected url: string = '/activities/';

	// public filter(query: string): Observable<Activity[]> {
	// 	return this.items.asObservable();
	// }

	// public near(address: Address): Observable<Activity[]> {
	// 	return this.items.map((i) => i.filter((j) =>
	// 		Math.abs(j.address.latitude - address.latitude) < .025 &&
	// 		Math.abs(j.address.longitude - address.longitude) < .025
	// 	));
	// }

}
