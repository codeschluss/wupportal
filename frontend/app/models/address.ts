import { Model } from 'app/models/model';
import { Suburb } from 'app/models/suburb';

export class Address extends Model {

	public latitude: number = 0;
	public longitude: number = 0;
	public houseNumber: number = 0;
	public place: string = '';
	public postalCode: string = '';
	public street: string = '';

	public suburb: Suburb = new Suburb();

}
