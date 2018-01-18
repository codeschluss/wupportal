import { Model } from 'app/models/model';
import { Suburb } from 'app/models/suburb';

export class Address extends Model {

	public latitude: number;
	public longitude: number;
	public house_number: string;
	public place: string;
	public postal_code: string;
	public street: string;
	public suburb_id: string;
	public suburb: Suburb;

	constructor(json: any = {} as Address) {
		super(json.id);
		this.latitude = json.latitude && json.latitude || 0;
		this.longitude = json.longitude && json.longitude || 0;
		this.house_number = json.house_number && json.house_number || '0';
		this.place = json.place && json.place || '';
		this.postal_code = json.postal_code && json.postal_code || '';
		this.street = json.street && json.street || '';
		this.suburb_id = json.suburb_id && json.suburb_id || '';
		this.suburb = json.suburb && new Suburb(json.suburb) || new Suburb();
	}

	get toString(): string {
		return this.isValid()
			? (
				this.street + ' ' +
				this.house_number + ' ' +
				this.postal_code + ' ' +
				this.place + ' ' +
				(this.suburb ? this.suburb.name : ''))
			: '';
	}

	public compareTo(address: Address): boolean {
		return address.street.toLocaleLowerCase().localeCompare(this.street.toLocaleLowerCase()) === 0 &&
			address.house_number.toLocaleLowerCase().localeCompare(this.house_number.toLocaleLowerCase()) === 0 &&
			address.postal_code.toLocaleLowerCase().localeCompare(this.postal_code.toLocaleLowerCase()) === 0 &&
			address.place.toLocaleLowerCase().localeCompare(this.place.toLocaleLowerCase()) === 0;
	}

	public isValid(): boolean {
		return this.place &&
			this.postal_code &&
			this.street &&
			this.house_number !== '0';
	}

}
