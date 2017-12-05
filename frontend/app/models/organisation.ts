import { Address } from 'app/models/address';
import { Model } from 'app/models/model';

export class Organisation extends Model {

	constructor(json: any) {
		super();
		this.id = json.id;
		this.name = json.name;
		this.description = json.description;
		this.website = json.website;
		this.mail = json.mail;
		this.phone = json.phone;
		this.image = json.image;
		this.address_id = json.address_id;

		if (json.address) { this.address = new Address(json.address); }
	}


	public name: string = '';
	public description: string = '';
	public website: string = '';
	public mail: string = '';
	public phone: string = '';
	public image: any = {};
	public address_id: string = '';

	public address: Address = null;

}
