import { Model } from 'app/models/model';

export class Schedule extends Model {

	constructor(json: any) {
		super(json.id);
		this.start_date = json.start_date;
		this.end_date = json.end_date;
		this.activity_id = json.activity_id;
		this.modified = json.modified;
		this.created = json.created;
	}

	public start_date: string = '';
	public end_date: string = '';
	public activity_id: string = '';

	public get startTime(): string {
		return new Date(this.start_date).toLocaleTimeString(['de-AT'], { hour: '2-digit', minute: '2-digit' });
	}

	public get endTime(): string {
		return new Date(this.end_date).toLocaleTimeString(['de-AT'], { hour: '2-digit', minute: '2-digit' });
	}

	public set startTime(time: string) {
		this.start_date = this.start_date.split(' ')[0] + ' ' + time + ':00';
	}

	public set endTime(time: string) {
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
		return this.start_date;
	}

}
