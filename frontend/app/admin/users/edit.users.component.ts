import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { User } from '../../common/model/user';
import { UserService } from '../../services/user.service';
import { Headers, Http } from '@angular/http';

@Component({
	selector: 'editusers',
	styleUrls: ['../table-basic.css'],
	templateUrl: './edit.users.component.html',
})
export class UsersComponent {
	protected headers = new Headers({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' });
	public selectedUser: User;
	displayedColumns = ['id', 'username', 'phone', 'admin', 'fullname'];
	usersDatabase = new UsersDatabase(this.userService);
	dataSource: UsersDataSource | null;

	constructor(
		private userService: UserService,
		private http: Http
	) { }

	@ViewChild('filter') filter: ElementRef;

	ngOnInit() {
		this.dataSource = new UsersDataSource(this.usersDatabase);
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.debounceTime(150)
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
	}

	createUser(): void {
		this.selectedUser = new User();
	}

	deselectUser(): void {
		this.selectedUser = null;
	}

	onSubmitUser() {
		if (this.selectedUser.id) {
			return this.http.put('http://localhost:4200' + '/users/' +
				this.selectedUser.id,
				JSON.stringify(this.selectedUser)
				, { headers: this.headers }
			).subscribe(newUser => this.selectedUser = newUser.json());
		}
		else {
			return this.http.post('http://localhost:4200' + '/users/',
				JSON.stringify(this.selectedUser)
				, { headers: this.headers }
			).subscribe(newUser => this.selectedUser = newUser.json());
		}
	}

	selectUser(user: User) {
		this.selectedUser = user;
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
			return this._usersDatabase.data.slice().filter((item: User) => {
				const searchStr = (item.username).toLowerCase();
				return searchStr.indexOf(this.filter.toLowerCase()) != -1;
			});
		});
	}

	disconnect() { }
}
