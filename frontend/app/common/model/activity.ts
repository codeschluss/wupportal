import { Address } from './address';
import { Category } from './category';
import { Provider } from './provider';
import { TargetGroup } from './target-group';
import { Tag } from './tag';

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
	) {};

}
