import { Model } from 'app/models/model';
import { Suburb } from 'app/models/suburb';

export class Address extends Model {

	constructor(json: any) {
		super(json ? json.id : '');
		if (json) {
			if (json.latitude) { this.latitude = json.latitude; }
			if (json.longitude) { this.longitude = json.longitude; }
			if (json.house_number) { this.house_number = json.house_number; }
			if (json.place) { this.place = json.place; }
			if (json.street) { this.street = json.street; }
			if (json.postal_code) { this.postal_code = json.postal_code; }
			if (json.suburb_id) { this.suburb_id = json.suburb_id; }
			if (json.suburb) { this.suburb = new Suburb(json.suburb); }
		}
	}

	public latitude: number = 0;
	public longitude: number = 0;
	public house_number: string = '0';
	public place: string = '';
	public postal_code: string = '';
	public street: string = '';
	public suburb_id: string = '';

	public suburb: Suburb = new Suburb;

	get toString(): string {
		if (this.checkAddress()) {
			return (
				this.street + ' ' +
				this.house_number + ' ' +
				this.postal_code + ' ' +
				this.place + ' ' +
				(this.suburb ? this.suburb.name : ''));
		} else {
			return '';
		}
	}

	public compareTo(address: Address): boolean {
		if (address.street.toLocaleLowerCase().localeCompare(this.street.toLocaleLowerCase()) === 0 &&
			address.house_number.toLocaleLowerCase().localeCompare(this.house_number.toLocaleLowerCase()) === 0 &&
			address.postal_code.toLocaleLowerCase().localeCompare(this.postal_code.toLocaleLowerCase()) === 0 &&
			address.place.toLocaleLowerCase().localeCompare(this.place.toLocaleLowerCase()) === 0
		) {
			return true;
		} else {
			return false;
		}
	}

	public checkAddress(): boolean {
		if (this.house_number &&
			this.place &&
			this.postal_code &&
			this.street) {
			return true;
		} else {
			return false;
		}
	}

}
