import { Model } from 'app/models/model';

export class Suburb extends Model {

	constructor(json: any) {
		super();
		this.name = json.name;
	}

	public name: string = '';

}
