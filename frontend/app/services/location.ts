import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Address } from 'app/models/address';
import { Service } from 'app/services/service';

@Injectable()
export class LocationService extends Service<Address> {

	protected baseURL: string = null;

	protected storable: boolean = true;

	protected syncable: boolean = 'geolocation' in navigator;

	protected synctime: number = 1000 * 90;

	public filter(query: string = null): Observable<Address[]> {
		return this.items.map((i) => [
			i.slice(i.length - 1) || new Address()
		]);
	}

	public remove(item: Address): void { }

	public save(item: Address): void { }

	public update(item: Address): void { }

	protected synchronise(): void {
		this.timer = setTimeout(() => { this.synchronise(); }, this.synctime);
		navigator.geolocation.getCurrentPosition((pos) => {
			if (pos.coords.latitude !== 0 && pos.coords.longitude !== 0) {
				this.items.next(this.items.value.concat((() => {
					const address = new Address();
					address.id = this.epoch().toString();
					address.latitude = pos.coords.latitude;
					address.longitude = pos.coords.longitude;
					return address;
				})()));
			}
		});
	}

}
