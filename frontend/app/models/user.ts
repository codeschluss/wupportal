import { Model } from 'app/models/model';
import { Provider } from 'app/models/provider';

export class User extends Model {

	constructor(json: any) {
		super();
		this.id = json.id;
		this.superuser = json.superuser;
		this.username = json.username;
		this.password = json.password;
		this.fullname = json.fullname;
		this.phone = json.phone;
		this.providers = json.providers;
	}

	public superuser: boolean = false;
	public username: string = '';
	public password: string = '';
	public fullname: string = '';
	public phone: string = '';
	public providers: Provider[] = new Array<Provider>();
}


