import { Organisation } from './organisation';
import { User } from './user';

export class Provider {

	public id: string;
	public admin: boolean;
	public organisation: Organisation;
	public user: User;

	constructor() {
		this.organisation = new Organisation();
		this.user = new User();
	}

}
