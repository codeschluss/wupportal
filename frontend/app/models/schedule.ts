import { Model } from 'app/models/model';
import { Recurrence } from 'app/models/recurrence';

export class Schedule extends Model {

	constructor(json: any) {
		super();
		this.id = json.id;
		this.recurrence_id = json.recurrence_id;
		if (json.recurrence) { this.recurrence = new Recurrence(json.recurrence); }
		this.start_date = new Date(json.start_date);
		this.end_date = new Date(json.end_date);
	}
	public recurrence_id: string = '';
	public recurrence: Recurrence = null;
	public start_date: Date = new Date();
	public end_date: Date = new Date();

	// if schedule has no Recurrence, use this date (hours and minutes and date)
	// else use Recurrence date without hours and minutes but still hours and minutes from schedule

	public get startTime(): string {
		return this.start_date.toLocaleTimeString(['de-AT'], { hour: '2-digit', minute: '2-digit' });
	}

	public get endTime(): string {
		return this.end_date.toLocaleTimeString(['de-AT'], { hour: '2-digit', minute: '2-digit' });
	}

	public set startTime(time: string) {
		this.start_date.setHours(parseInt(time.split(':')[0], 10));
		this.start_date.setMinutes(parseInt(time.split(':')[1], 10));
	}

	public set endTime(time: string) {
		console.log('beforeSetting: ' + this.end_date);
		this.end_date.setHours(parseInt(time.split(':')[0], 10));
		this.end_date.setMinutes(parseInt(time.split(':')[1], 10));
		console.log('afterSetting: ' + this.end_date);
	}

	get toString(): string {
		if (this.recurrence) {
			let dayNames: string = '';
			for (const day of this.recurrence.week_days) {
				dayNames += day.name;
			}
			return dayNames + 's ' + this.startTime;
		} else {
			return this.start_date.getDay() + '.' + this.start_date.getMonth() + 1 + '.' + this.start_date.getFullYear() + ' ' + this.startTime;
		}
	}

}
