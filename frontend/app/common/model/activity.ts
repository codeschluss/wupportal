import { Address } from './address';
import { Category } from './category';
import { Provider } from './provider';
import { Tag } from './tag';
import { TargetGroup } from './target-group';
import { Translation } from './translation';

export class Activity {

	public id: string;
	public name: string;
	public description: string;
	public schedule: string;
	public show_user: boolean;
	public address: Address;
	public provider: Provider;
	public category: Category;
	public tags: Tag[];
	public targetGroups: TargetGroup[];
	public translations: Translation[];

	constructor() {
		this.address = new Address();
		this.category = new Category();
		this.provider = new Provider();
		this.tags = new Array();
		this.targetGroups = new Array();
		this.translations = new Array();
	}

}
