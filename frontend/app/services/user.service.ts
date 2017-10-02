import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';

import { DataService } from 'app/services/data.service';
import { User } from 'app/models/user';

@Injectable()
export class UserService extends DataService<User> {

	protected baseURL: string = '/users/'

	getUsers(): Promise<User[]> {
		return this.http.get(this.baseURL, { headers: this.headers })
			.toPromise()
			.then(response => response.json().users as User[])
			.catch(this.handleError);
	}

	postUser(user: User) {
		return this.http.post(this.baseURL + 'add/',
			JSON.stringify(user)
			, { headers: this.headers }
		).subscribe();
	}

	editUser(user: User) {
		return this.http.put(this.baseURL + 'edit/' +
			user.id,
			JSON.stringify(user)
			, { headers: this.headers }
		).subscribe(newUser => user = newUser.json());
	}

	deleteUser(user: User) {
		return this.http.delete(this.baseURL + 'delete/' +
			user.id
			, { headers: this.headers }
		).subscribe();
	}

	getUsersDatabase(): UsersDatabase {
		return new UsersDatabase(this);
	}

	getUsersDataSource(): UsersDataSource {
		return new UsersDataSource(new UsersDatabase(this));
	}
}

export class UsersDatabase {
	public users: User[];
	dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

	constructor(private userService: UserService) {
		this.users = new Array();
		this.userService.getUsers().then(users => {
			users.forEach(user => {
				this.users.push(user);
				this.dataChange.next(this.users);
			});
		});
	}
	get data(): User[] { return this.dataChange.value; }
}

export class UsersDataSource extends DataSource<any> {
	_filterChange = new BehaviorSubject('');
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }

	constructor(private _usersDatabase: UsersDatabase) {
		super();
	}

	connect(): Observable<User[]> {
		const displayDataChanges = [
			this._usersDatabase.dataChange,
			this._filterChange,
		];
		return Observable.merge(...displayDataChanges).map(() => {
			return this._usersDatabase.data.slice().filter((user: User) => {
				const searchStr = (user.username).toLowerCase();
				return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
			});
		});
	}

	disconnect() { }
}
