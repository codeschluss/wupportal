import { Address } from 'app/models/address';
import { Model } from 'app/models/model';

export class Organisation extends Model {

	public name: string = '';
	public description: string = '';
	public website: string = '';
	public mail: string = '';
	public phone: string = '';
	public image: any = {};
	public address_id: string = '';

	public address: Address = new Address();

}
