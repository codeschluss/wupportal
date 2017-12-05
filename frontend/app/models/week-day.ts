import { Model } from 'app/models/model';

export class WeekDay extends Model {

	constructor(json: any) {
		super();
		this.id = json.id;
		this.name = json.name;
	}

	public name: string = '';
}
