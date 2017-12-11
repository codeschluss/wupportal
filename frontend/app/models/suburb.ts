import { Model } from 'app/models/model';

export class Suburb extends Model {

	public name: string = '';

	constructor(json: any = {} as Suburb) {
		super(json.id);
		this.name = json.name && json.name || '';
	}

}
