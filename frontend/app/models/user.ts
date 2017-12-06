import { Model } from 'app/models/model';
import { Provider } from 'app/models/provider';

export class User extends Model {

	constructor(json: any) {
		super();
		json.id ? this.id = json.id : this.id = '';
		json.superuser ? this.superuser = json.superuser : this.superuser = false;
		json.username ? this.username = json.username : this.username = '';
		json.password ? this.password = json.password : this.password = '';
		json.fullname ? this.fullname = json.fullname : this.fullname = '';
		json.phone ? this.phone = json.phone : this.phone = '';
		json.providers ? this.providers = json.providers : this.providers = new Array<Provider>();
	}

	public superuser: boolean = false;
	public username: string = '';
	public password: string = '';
	public fullname: string = '';
	public phone: string = '';
	public providers: Provider[] = new Array<Provider>();
}


