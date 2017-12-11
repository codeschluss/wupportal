import { Model } from 'app/models/model';

export class TargetGroup extends Model {

	public name: string = '';
	public description: string = '';

	constructor(json: any = {} as TargetGroup) {
		super(json.id);
		this.name = json.name && json.name || '';
		this.description = json.description && json.description || '';
	}
}
