import { Address } from 'app/models/address';
import { Category } from 'app/models/category';
import { Model } from 'app/models/model';
import { Provider } from 'app/models/provider';
import { Tag } from 'app/models/tag';
import { TargetGroup } from 'app/models/target-group';
import { Translation } from 'app/models/translation';

export class Activity extends Model {

	public name: string = '';
	public description: string = '';
	public schedule: string = '';
	public showUser: boolean = false;

	public address_id: string = '';
	public address: Address = new Address();
	public provider: Provider = new Provider();
	public category: Category = new Category();

	public tags: Tag[] = [];
	public target_groups: TargetGroup[] = [];
	public translations: Translation[] = [];

}
