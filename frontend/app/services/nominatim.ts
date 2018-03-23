import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Address } from 'app/models/address';
import { Service } from 'app/services/service';


@Injectable()
export class NominatimService extends Service {

	constructor(
		private http: HttpClient,
		protected messagebar: MatSnackBar) {
		super(messagebar);
	}

	protected baseURL: string = '';
	protected url: string = 'https://nominatim.openstreetmap.org/search/';

	private format: string = '?format=json&addressdetails=1';

	public get(query: string): Observable<Address> {
		return this.http.get(this.url + query + this.format)
			.map((res) => (res as JSON[]).shift()).map((i) => {
				const address = new Address({});
				address.suburb = null;
				if (i) {
					address.latitude = i['lat'];
					address.longitude = i['lon'];
					address.house_number = i['address']['house_number'] ? i['address']['house_number'] : '';
					address.place = i['address']['city'];
					if (address.place == null) {
						address.place = i['address']['county'] ? i['address']['county'] : '';
					}
					address.postal_code = i['address']['postcode'] ? i['address']['postcode'] : '';
					address.street = i['address']['road'];
					if (address.street == null) {
						address.street = i['address']['construction'];
					}
					if (address.street == null) {
						address.street = i['address']['pedestrian'] ? i['address']['pedestrian'] : '';
					}
				}
				return address;
			}
			);
	}

}
