import { Model } from 'app/models/model';

export class Suburb extends Model {

	constructor(json: any = {} as Suburb) {
		super(json.id);
		this.name = json.name && json.name || '';
	}

	public name: string = '';

}
