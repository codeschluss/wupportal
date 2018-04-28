import { Address } from 'app/models/address';
import { Model } from 'app/models/model';

export class Organisation extends Model {

	public name: string = '';
	public description: string = '';
	public website: string = '';
	public mail: string = '';
	public phone: string = '';
	public image: any = null;
	public address_id: string = '';
	public address: Address = new Address({});
	public _translations: any = {};


	constructor(json: any = {} as Organisation) {
		super(json.id);
		this.name = json.name && json.name || '';
		this.description = json.description && json.description || '';
		this.website = json.website && json.website || '';
		this.mail = json.mail && json.mail || '';
		this.phone = json.phone && json.phone || '';
		this.image = json.image && json.image || null;
		this.address_id = json.address_id && json.address_id || {};
		this._translations = json._translations && Object.assign(json._translations) || {};
		if (json.address) { this.address = new Address(json.address); }

	}

}
