import { Model } from 'app/models/model';
import { WeekDay } from 'app/models/week-day';

export class Reccurrence extends Model {

	public id: string = '';
	public weekly_period: number = 0;
	public beginn_by: Date = new Date();
	public end_by: Date = new Date();
	public week_days: WeekDay[] = [];
}
