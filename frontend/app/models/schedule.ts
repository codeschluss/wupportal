import { Model } from 'app/models/model';
// import { Constants } from 'app/services/constants';

export class Schedule extends Model {

	constructor(json: any) {
		super(json.id);
		this.start_date = json.start_date;
		this.end_date = json.end_date;
	}

	public start_date: string = '';
	public end_date: string = '';

	public get startTime(): string {
		return new Date(this.start_date).toLocaleTimeString(['de-AT'], { hour: '2-digit', minute: '2-digit' });
	}

	public get endTime(): string {
		return new Date(this.end_date).toLocaleTimeString(['de-AT'], { hour: '2-digit', minute: '2-digit' });
	}

	public set startTime(time: string) {
		this.start_date = new Date(this.start_date).toISOString().slice(0, 19).replace('T', ' ');
		this.start_date = this.start_date.split(' ')[0] + ' ' + time + ':00';
	}

	public set endTime(time: string) {
		this.end_date = new Date(this.end_date).toISOString().slice(0, 19).replace('T', ' ');
		this.end_date = this.end_date.split(' ')[0] + ' ' + time + ':00';
	}

	public get startDate(): string {
		return this.start_date.split(' ')[0];
	}

	public set startDate(date: string) {
		this.start_date = date;
	}

	public get endDate(): string {
		return this.end_date.split(' ')[0];
	}

	public set endDate(date: string) {
		this.end_date = date;
	}

	get toString(): string {
		if (this.start_date && this.end_date) {
			return this.start_date + ' - ' + this.end_date;
		} else {
			return '';
		}

		// this.getWeekDay(new Date(this.start_date).getDay()) + ' ' +
	}

	// getWeekDay(weekDayNumber: number): string {
	// 	return Costants.weekDaysArray[weekDayNumber];
	// }

}
