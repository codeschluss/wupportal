import { Model } from 'app/models/model';
import { Suburb } from 'app/models/suburb';

export class Address extends Model {

	public latitude: number = 0;
	public longitude: number = 0;
	public house_number: string = '0';
	public place: string = '';
	public postal_code: string = '';
	public street: string = '';
	public suburb_id: string = '';

	public suburb: Suburb = new Suburb();

}
