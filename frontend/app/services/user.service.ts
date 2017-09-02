import { Injectable } from '@angular/core';

import { User } from '../common/model/user';
import { Service } from './service';

@Injectable()
export class UserService extends Service {

	getUsers(): Promise<User[]> {
		return this.http.get(this.basicURL + '/user', { headers: this.headers })
			.toPromise()
			.then(response => response.json().user as User[])
			.catch(this.handleError);
	}
}
