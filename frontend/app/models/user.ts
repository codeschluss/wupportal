import { Model } from 'app/models/model';

export class User extends Model {

	public admin: boolean = false;
	public username: string = '';
	public password: string = '';
	public fullname: string = '';
	public phone: string = '';

}
