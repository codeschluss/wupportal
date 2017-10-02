import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Address } from 'app/models/address';
import { DataService } from 'app/services/data.service';

@Injectable()
export class NominatimService extends DataService<Address> {

	// TODO: Legacy {
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
	// }

	private format: string = '?format=json&addressdetails=1';

	protected baseURL: string = '//nominatim.openstreetmap.org/search/';

	public resolve(query: string): Observable<Address> {
		return this.http.get(this.baseURL + query + this.format).map((response) => {
			let address = response.json() as JSON[];

			return {
				latitude: address[0]['lat'],
				longitude: address[0]['lon'],
				houseNumber: address[0]['address']['house_number'],
				postalCode: address[0]['address']['postcode'],
				place: address[0]['address']['city'],
				street: address[0]['address']['road']
			} as Address;
		});
	}

}
