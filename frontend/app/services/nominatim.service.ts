import { Injectable } from '@angular/core';

import { Address } from 'app/models/address';
import { Service } from 'app/services/service';

@Injectable()
export class NominatimService extends Service<Address> {
	currentAddress: Address;

	getGeoDates(query: string): Promise<JSON[]> {
		return this.http.get(
			'http://nominatim.openstreetmap.org/search/'
			+ query + '?format=json&addressdetails=1'
		).toPromise().then(response => response.json() as JSON[]);
	}

	getAddress(input: string): Address {
		this.currentAddress = new Address();
		this.getGeoDates(input).then(results => {
			results.forEach(geoDate => {
				this.currentAddress.latitude = geoDate['lat'];
				this.currentAddress.longitude = geoDate['lon'];
				this.currentAddress.houseNumber = geoDate['address']['house_number'];
				this.currentAddress.postalCode = geoDate['address']['postcode'];
				this.currentAddress.place = geoDate['address']['city'];
				this.currentAddress.street = geoDate['address']['road'];
			});
		});
		return this.currentAddress;
	}
}
