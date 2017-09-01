import { Address } from './address';
import { Category } from './category';
import { Provider } from './provider';
import { Tag } from './tag';
import { TargetGroup } from './target-group';
import { Translation } from './translation';

export class Activity {

	constructor(
		public id: string,
		public name: string,
		public description: string,
		public schedule: string,
		public minage: number,
		public maxage: number,
		public showUser: boolean,
		public address: Address,
		public provider: Provider,
		public category: Category,
		public tags: Tag[],
		public targetGroups: TargetGroup[],
		public translations: Translation[],
	) {}

}
