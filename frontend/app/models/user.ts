import { Model } from 'app/models/model';
import { Provider } from 'app/models/provider';

export class User extends Model {

	public id: string = '';
	public superuser: boolean = false;
	public username: string = '';
	public password: string = '';
	public fullname: string = '';
	public phone: string = '';
	public providers: Array<Provider> = [];
}


