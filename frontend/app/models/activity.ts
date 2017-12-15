import { Address } from 'app/models/address';
import { Category } from 'app/models/category';
import { Model } from 'app/models/model';
import { Provider } from 'app/models/provider';
import { Tag } from 'app/models/tag';
import { TargetGroup } from 'app/models/target-group';
import { Translation } from 'app/models/translation';
import { Schedule } from 'app/models/schedule';


export class Activity extends Model {
	constructor(json: any) {
		super(json ? json.id : '');
		if (json) {
			if (json.name) { this.name = json.name; }
			if (json.description) { this.description = json.description; }
			if (json.showUser) { this.showUser = json.showUser; }
			if (json.address_id) { this.address_id = json.address_id; }
			if (json.address) { this.address = new Address(json.address); }
			if (json.provider_id) { this.provider_id = json.provider_id; }
			if (json.provider) { this.provider = new Provider(json.provider); }
			if (json.category_id) { this.category_id = json.category_id; }
			if (json.category) { this.category = new Category(json.category); }
			if (json.schedules && json.schedules.length) { this.schedules = this.buildScheduleArray(json.schedules); }
			if (json.tags) { this.tags = json.tags; }
			if (json.target_groups) { this.target_groups = json.target_groups; }
			// if (json.translations) { this.translations = json.translations; }
		}
	}

	public name: string = '';
	public description: string = '';
	public showUser: boolean = false;

	public address_id: string = '';
	public address: Address = new Address({});
	public provider_id: string = '';
	public provider: Provider = new Provider({});
	public category_id: string = '';
	public category: Category = new Category();

	public schedules: Schedule[] = [];
	public tags: Tag[] = [];
	public target_groups: TargetGroup[] = [];
	// public translations: Translation[] = null;

	buildScheduleArray(dates: any[]): Schedule[] {
		const scheduleArray: Schedule[] = [];
		for (const date of dates) {
			scheduleArray.push(new Schedule(date));
		}
		return scheduleArray;
	}

}
