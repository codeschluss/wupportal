import { Model } from 'app/models/model';
import * as moment from 'moment';
import { Moment } from 'moment';

export class Schedule extends Model {

	constructor(json: any) {
		super(json.id);
		this.start_date = moment(json.start_date).format('YYYY-MM-DD HH:mm:ss');
		this.end_date = moment(json.end_date).format('YYYY-MM-DD HH:mm:ss');
	}

	public start_date: string = moment().format('YYYY-MM-DD HH:mm:ss');
	public end_date: string = moment().format('YYYY-MM-DD HH:mm:ss');

	public get startTime(): string {
		return moment(this.start_date).format();
	}

	public get endTime(): string {
		return moment(this.end_date).format();
	}

	public set startTimeHour(time: number) {
		this.start_date = moment(this.start_date).set({ hour: time }).format('YYYY-MM-DD HH:mm:ss');
	}

	public set startTimeMinute(time: number) {
		this.start_date = moment(this.start_date).set({ minute: time }).format('YYYY-MM-DD HH:mm:ss');
	}

	public set endTimeHour(time: number) {
		this.end_date = moment(this.end_date).set({ hour: time }).format('YYYY-MM-DD HH:mm:ss');
	}

	public set endTimeMinute(time: number) {
		this.end_date = moment(this.end_date).set({ minute: time }).format('YYYY-MM-DD HH:mm:ss');
	}

	public get startDate(): string {
		return this.start_date;
	}

	public set startDate(date: string) {
		const startDate = moment(date);
		this.start_date = moment(this.start_date)
			.set({ year: startDate.year(), month: startDate.month(), date: startDate.date() })
			.format('YYYY-MM-DD HH:mm:ss');
	}

	public get endDate(): string {
		return this.end_date;
	}

	public set endDate(date: string) {
		const endDate = moment(date);
		this.end_date = moment(this.end_date)
			.set({ year: endDate.year(), month: endDate.month(), date: endDate.date() })
			.format('YYYY-MM-DD HH:mm:ss');
	}

	get toString(): string {
		if (this.start_date && this.end_date) {
			return moment(this.start_date).locale('de').format('LLLL')
				+ ' - ' + moment(this.end_date).locale('de').format('LLLL');
		} else {
			return '';
		}
	}

	public compareTo(schedule: Schedule): boolean {
		if (this.toString.localeCompare(schedule.toString)) {
			return true;
		}
		return false;
	}

}
