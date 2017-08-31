import { Organisation } from './organisation';
import { User } from './user';

export class Provider {

	constructor(
		public id: string,
		public admin: boolean,
		public organisation: Organisation,
		public user: User,
	) {};

}
