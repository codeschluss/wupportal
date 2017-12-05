import { Model } from 'app/models/model';
import { Recurrence } from 'app/models/recurrence';

export class Schedule extends Model {

	public id: string = '';
	public recurrence: Recurrence = null;
	public start_date: Date = new Date();
	public end_date: Date = new Date();


}
