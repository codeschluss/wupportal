import 'rxjs/add/observable/of';

import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Address } from 'app/models/address';
import { Service } from 'app/services/service';

@Injectable()
export class LocationService extends Service<Address> {

	protected url: string = null;

	public add(item: Address): void { return; }

	public delete(item: Address): void { return; }

	public edit(item: Address): void { return; }

	public get(query: string = null): Observable<Address> {
		const address = new Address();

		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((pos) => {
				if (pos.coords.latitude === 0 || pos.coords.longitude === 0) return;
				address.latitude = pos.coords.latitude;
				address.longitude = pos.coords.longitude;
			});
		}

		return Observable.of(address);
	}

	public list(): Observable<Address[]> { return null; }

}
