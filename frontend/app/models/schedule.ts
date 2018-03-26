import { Model } from 'app/models/model';
import * as moment from 'moment';
import { Moment } from 'moment';

export class Schedule extends Model {

	constructor(json: any) {
		super(json.id);
		this.start_date_moment = moment(json.start_date).utc();
		this.start_date = this.start_date_moment.format('YYYY-MM-DD HH:mm:ss');
		this.end_date_moment = moment(json.end_date).utc();
		this.end_date = moment(json.end_date).utc().format('YYYY-MM-DD HH:mm:ss');
	}

	public start_date: string = moment().format('YYYY-MM-DD HH:mm:ss');
	public end_date: string = moment().format('YYYY-MM-DD HH:mm:ss');
	private start_date_moment: Moment = moment().utc();
	private end_date_moment: Moment = moment().utc();


	public get startTime(): string {
		return this.start_date_moment.format('YYYY-MM-DD HH:mm:ss');
	}

	public get endTime(): string {
		return this.end_date_moment.format('YYYY-MM-DD HH:mm:ss');
	}

	public set startTimeHour(time: number) {
		this.start_date_moment.set({ hour: time });
		this.start_date = this.start_date_moment.format('YYYY-MM-DD HH:mm:ss');
	}

	public set startTimeMinute(time: number) {
		this.start_date_moment.set({ minute: time });
		this.start_date = this.start_date_moment.format('YYYY-MM-DD HH:mm:ss');
	}

	public set endTimeHour(time: number) {
		this.end_date_moment.set({ hour: time });
		this.end_date = this.end_date_moment.format('YYYY-MM-DD HH:mm:ss');
	}

	public set endTimeMinute(time: number) {
		this.end_date_moment.set({ minute: time });
		this.end_date = this.end_date_moment.format('YYYY-MM-DD HH:mm:ss');
	}

	public get startDate(): string {
		return this.start_date;
	}

	public set startDate(date: string) {
		this.start_date_moment = moment(date);
		this.start_date = this.start_date_moment.utc().format('YYYY-MM-DD HH:mm:ss');
	}

	public get endDate(): string {
		return this.end_date;
	}

	public set endDate(date: string) {
		this.end_date_moment = moment(date);
		this.end_date = this.start_date_moment.utc().format('YYYY-MM-DD HH:mm:ss');
	}

	get toString(): string {
		if (this.start_date && this.end_date) {
			return this.start_date_moment.locale('de').format('LLLL')
				+ ' - ' + this.end_date_moment.locale('de').format('LLLL');
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
