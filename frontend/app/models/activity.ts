import { Address } from 'app/models/address';
import { Category } from 'app/models/category';
import { Model } from 'app/models/model';
import { Provider } from 'app/models/provider';
import { Tag } from 'app/models/tag';
import { TargetGroup } from 'app/models/target-group';
import { Schedule } from 'app/models/schedule';


export class Activity extends Model {
	constructor(json: any = {} as Activity) {
		super(json ? json.id : '');
		if (json) {
			if (json.name) { this.name = json.name; }
			if (json.description) { this.description = json.description; }
			if (json.show_user) { this.show_user = json.show_user; }
			if (json.address_id) { this.address_id = json.address_id; }
			if (json.address) { this.address = new Address(json.address); }
			if (json.provider_id) { this.provider_id = json.provider_id; }
			if (json.provider) { this.provider = new Provider(json.provider); }
			if (json.category_id) { this.category_id = json.category_id; }
			if (json.category) { this.category = new Category(json.category); }
			if (json.schedules && json.schedules.length) { this.schedules = this.buildScheduleArray(json.schedules); }
			if (json.tags) { this.tags = json.tags; }
			if (json.target_groups) { this.target_groups = json.target_groups; }
			// this.translations = Object.assign(json._translations);
		}
	}

	public name: string = '';
	public description: string = '';
	public show_user: boolean = false;

	public address_id: string = '';
	public address: Address = new Address({});
	public provider_id: string = '';
	public provider: Provider = new Provider({});
	public category_id: string = '';
	public category: Category = new Category();

	public schedules: Schedule[] = [];
	public tags: Tag[] = [];
	public target_groups: TargetGroup[] = [];
	public translations: any = {};

	buildScheduleArray(dates: any[]): Schedule[] {
		const scheduleArray: Schedule[] = [];
		for (const date of dates) {
			scheduleArray.push(new Schedule(date));
		}
		return scheduleArray;
	}

}
