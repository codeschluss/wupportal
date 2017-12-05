import { Model } from 'app/models/model';

export class Category extends Model {

	constructor(json: any) {
		super();
		this.id = json.id;
		this.name = json.name;
		this.color = json.color;
		this.description = json.description;
	}

	public name: string = '';
	public description: string = '';
	public color: string = '';

}
