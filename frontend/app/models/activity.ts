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
		super();
		this.id = json.id;
		this.name = json.name;
		this.description = json.description;
		this.showUser = json.showUser;
		this.address_id = json.address_id;
		if (json.address) { this.address = new Address(json.address); }
		this.provider_id = json.provider_id;
		if (json.provider) { this.provider = new Provider(json.provider); }
		this.category = json.category;
		if (this.schedule) { this.schedule = new Schedule(json.schedule); }
		this.tags = json.tags;
		this.target_groups = json.target_groups;
		this.translations = json.translations;
	}

	public name: string = '';
	public description: string = '';
	public showUser: boolean = false;

	public address_id: string = '';
	public address: Address = null;
	public provider_id: string = '';
	public provider: Provider = null;
	public category: Category = null;

	public schedule: Schedule = null;
	public tags: Tag[] = [];
	public target_groups: TargetGroup[] = [];
	public translations: Translation[] = [];

}
