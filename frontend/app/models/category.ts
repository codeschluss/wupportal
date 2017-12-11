import { Model } from 'app/models/model';

export class Category extends Model {

	public name: string = '';
	public description: string = '';
	public color: string = '';

	constructor(json: any = {} as Category) {
		super(json.id);
		this.name = json.name && json.name || '';
		this.color = json.color && json.color || '';
		this.description = json.description && json.description || '';
	}

}
