import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Address } from 'app/models/address';
import { Service } from 'app/services/service';

@Injectable()
export class LocationService extends Service {

	constructor(
		protected messageBar: MatSnackBar
	) {
		super(messageBar);
	}

	public get(query: string = null): Observable<Address> {
		const address = new Address({});

		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((pos) => {
				if (pos.coords.latitude === 0 || pos.coords.longitude === 0) { return; }
				address.latitude = pos.coords.latitude;
				address.longitude = pos.coords.longitude;
			});
		}

		return Observable.of(address);
	}

	public list(): Observable<Address[]> { return null; }

}
