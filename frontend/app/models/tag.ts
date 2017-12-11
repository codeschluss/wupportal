import { Model } from 'app/models/model';

export class Tag extends Model {

	public name: string = '';
	public description: string = '';

	constructor(json: any = {} as Tag) {
		super(json.id);
		this.name = json.name && json.name || '';
		this.description = json.description && json.description || '';
	}

}
