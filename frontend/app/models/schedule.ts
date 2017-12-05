import { Model } from 'app/models/model';
import { Recurrence } from 'app/models/recurrence';

export class Schedule extends Model {

	constructor(json: any) {
		super();
		this.id = json.id;
		if (json.recurrence) { this.recurrence = new Recurrence(json.recurrence); }
		this.start_date = new Date(json.start_date);
		this.end_date = new Date(json.end_date);
	}

	public recurrence: Recurrence = null;
	public start_date: Date = new Date();
	public end_date: Date = new Date();

	// if schedule has no Recurrence, use this date (hours and minutes and date)
	// else use Recurrence date without hours and minutes but still hours and minutes from schedule

	public get startTime(): string {
		console.log('getting start time');
		return this.start_date.toLocaleTimeString();
	}

	public get endTime(): string {
		console.log('getting end time');
		return this.end_date.toLocaleTimeString();
	}

	public set startTime(time: string) {
		const startTimeDate: Date = new Date(time);
		this.start_date.setMinutes(startTimeDate.getMinutes());
		this.start_date.setHours(startTimeDate.getHours());
	}

	public set endTime(time: string) {
		const endTimeDate: Date = new Date(time);
		this.end_date.setMinutes(endTimeDate.getMinutes());
		this.end_date.setHours(endTimeDate.getHours());
	}

}
