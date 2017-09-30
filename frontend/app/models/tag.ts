import { Model } from 'app/models/model';

export class Tag extends Model {

	public name: string = '';
	public description: string = '';

	public constructor() { super(); }

}
