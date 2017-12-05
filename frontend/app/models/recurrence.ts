import { Model } from 'app/models/model';
import { WeekDay } from 'app/models/week-day';

export class Recurrence extends Model {

	constructor(json: any) {
		super();
		this.id = json.id;
		this.weekly_period = json.weekly_period;
		this.beginn_by = new Date(json.beginn_by);
		this.end_by = new Date(json.end_by);
		this.week_days = json.week_days;
	}

	public weekly_period: number = 0;
	public beginn_by: Date = new Date();
	public end_by: Date = new Date();
	public week_days: WeekDay[] = [];
}
