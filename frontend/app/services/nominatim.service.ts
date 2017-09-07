import { Injectable } from '@angular/core';

import { Address } from '../common/model/address';
import { Service } from './service';

@Injectable()
export class NominatimService extends Service {
	currentAddress: Address;

	getGeoDates(string: string): Promise<JSON[]> {
		return this.http.get('http://nominatim.openstreetmap.org/search/' +
			string +
			'?format=json&addressdetails=1')
			.toPromise()
			.then(response => response.json() as JSON[]);
	}

	getAddress(input: string): Address {
		this.currentAddress = new Address();
		this.getGeoDates(input).then(results => {
			results.forEach(geoDate => {
				this.currentAddress.latitude = geoDate['lat'];
				this.currentAddress.longitude = geoDate['lon'];
				this.currentAddress.housenumber = geoDate['address']['house_number'];
				this.currentAddress.postalcode = geoDate['address']['postcode'];
				this.currentAddress.place = geoDate['address']['city'];
				this.currentAddress.street = geoDate['address']['road'];
			});
		});
		return this.currentAddress;
	}
}
