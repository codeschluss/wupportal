import { Model } from 'app/models/model';
import { Organisation } from 'app/models/organisation';
import { User } from 'app/models/user';

export class Provider extends Model {

	public admin: boolean;
	public approved: boolean;
	public organisation: Organisation;
	public user: User;
	public organisation_id: string;
	public user_id: string;

	constructor(json: any = {} as Provider) {
		super(json.id);
		this.admin = json.admin && json.admin || false;
		this.approved = json.approved && json.approved || false;
		this.organisation_id = json.organisation_id && json.organisation_id || '';
		this.user_id = json.user_id && json.user_id || '';
		this.organisation = json.organisation && new Organisation(json.organisation) || null;
		this.user = json.user && new User(json.user) || null;
	}
}
