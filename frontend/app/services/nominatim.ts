import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Address } from 'app/models/address';
import { Service } from 'app/services/service';

@Injectable()
export class NominatimService extends Service<Address> {

	protected baseURL: string = 'https://nominatim.openstreetmap.org/search/';

	protected storable: boolean = false;

	protected syncable: boolean = false;

	protected synctime: number = null;

	private format: string = '?format=json&addressdetails=1';

	public filter(query: string): Observable<Address[]> {
		return this.http.get(this.baseURL + query + this.format)
			.map((res) => (res.json() as JSON[]).map((i) => {
				const address = new Address();
				address.latitude = i['lat'];
				address.longitude = i['lon'];
				address.houseNumber = i['address']['house_number'];
				address.place = i['address']['city'];
				address.postalCode = i['address']['postcode'];
				address.street = i['address']['road'];
				return address;
			}));
	}

	public remove(item: Address): void { }

	public save(item: Address): void { }

	public update(item: Address): void { }

}
