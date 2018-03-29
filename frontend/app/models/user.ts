import { Model } from 'app/models/model';
import { Provider } from 'app/models/provider';
import { Organisation } from 'app/models/organisation';

export class User extends Model {

	public superuser: boolean;
	public username: string;
	public password: string;
	public fullname: string;
	public phone: string;
	public providers: Provider[];

	constructor(json: any = {} as User) {
		super(json.id);
		this.superuser = json.superuser && json.superuser || false;
		this.username = json.username && json.username || '';
		this.password = json.password && json.password || '';
		this.fullname = json.fullname && json.fullname || '';
		this.phone = json.phone && json.phone || '';
		this.providers = json.providers && json.providers || new Array<Provider>();
	}

	public getAdminOrgas(): Array<Organisation> {
		const adminOrgas: Array<Organisation> = new Array<Organisation>();
		this.providers.forEach(provider => {
			if (provider.admin) {
				adminOrgas.push(provider.organisation);
			}
		});
		return adminOrgas;
	}

	public isOrgaAdmin(): boolean {
		let orgaAdmin: boolean = false;
		this.providers.forEach(provider => {
			if (provider.admin) {
				orgaAdmin = true;
			}
		});
		return orgaAdmin;
	}

	public isApproved(): boolean {
		let isApprovedProvider: boolean = false;
		this.providers.forEach(provider => {
			if (provider.approved) {
				isApprovedProvider = true;
			}
		});
		return isApprovedProvider;
	}
}


