import { Model } from 'app/models/model';
import { Organisation } from 'app/models/organisation';
import { User } from 'app/models/user';

export class Provider extends Model {

	constructor(json: any) {
		super();
		this.id = json.id;
		this.admin = json.admin;
		if (json.organisation) { this.organisation = new Organisation(json.organisation); }
		if (json.user) { this.user = new User(json.user); }
		this.organisation_id = json.organisation_id;
		this.user_id = json.user_id;
	}

	public admin: boolean = false;

	public organisation: Organisation = null;
	public user: User = null;
	public organisation_id: string;
	public user_id: string;

}
