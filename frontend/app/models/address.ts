import { Model } from 'app/models/model';
import { Suburb } from 'app/models/suburb';

export class Address extends Model {

	public latitude: number = 0;
	public longitude: number = 0;
	public street: string = '';
	public houseNumber: number = 0;
	public postalCode: string = '';
	public place: string = '';

	public suburb: Suburb = new Suburb();

}
