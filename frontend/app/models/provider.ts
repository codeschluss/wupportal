import { Model } from 'app/models/model';
import { Organisation } from 'app/models/organisation';
import { User } from 'app/models/user';

export class Provider extends Model {

	public admin: boolean = false;

	public organisation: Organisation = new Organisation();
	public user: User = new User();
	public organisation_id: string;
	public user_id: string;

}
