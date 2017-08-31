import { Address } from './address';

export class Organisation {

	constructor(
		public id: string,
		public name: string,
		public description: string,
		public website: string,
		public mail: string,
		public phone: string,
		public image: any,
		public address: Address,
	) {};

}
