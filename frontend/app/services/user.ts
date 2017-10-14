import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Service } from 'app/services/service';
import { User } from 'app/models/user';

@Injectable()
export class UserService extends Service<User> {

	protected baseURL: string = 'users';

	protected storable: boolean = true;

	protected syncable: boolean = true;

	protected synctime: number = 1000 * 120;

	public filter(query: string): Observable<User[]> {
		return this.items.asObservable();
	}

}
