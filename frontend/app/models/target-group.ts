import { Model } from 'app/models/model';

export class TargetGroup extends Model {

	public name: string = '';
	public description: string = '';
	public _translations: any = {};

	constructor(json: any = {} as TargetGroup) {
		super(json.id);
		this.name = json.name && json.name || '';
		this.description = json.description && json.description || '';
		this._translations = json._translations && Object.assign(json._translations) || {};
	}
}
