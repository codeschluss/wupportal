import { Model } from 'app/models/model';

export class Translation extends Model {

	public locale: string = '';
	public name: string = '';

	public constructor() { super(); }

}
