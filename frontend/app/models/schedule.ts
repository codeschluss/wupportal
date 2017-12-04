import { Model } from 'app/models/model';
import { Reccurrence } from 'app/models/reccurrence';

export class Schedule extends Model {

	public id: string = '';
	public recurrence: Reccurrence = new Reccurrence();
	public start_date: Date = new Date();
	public end_date: Date = new Date();
}
