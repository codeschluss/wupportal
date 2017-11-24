import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/models/user';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'edit-users',
	styleUrls: ['../table-basic.css'],
	templateUrl: 'users.table.html',
})
export class UsersComponent implements AfterViewInit {
	displayedColumns = ['id', 'username', 'fullname', 'phone'];
	userDatabase: HttpDao | null;
	dataSource = new MatTableDataSource();
	resultsLength = 4;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private http: HttpClient) { }

	ngAfterViewInit() {
		this.userDatabase = new HttpDao(this.http);
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		Observable.merge(this.sort.sortChange, this.paginator.page)
			.startWith(null)
			.switchMap(() => {
				return this.userDatabase.getData();
			})
			.map(data => {
				return data;
			})
			.catch(() => {
				return Observable.of([]);
			})
			.subscribe(data => this.dataSource.data = data);
	}
}

export class HttpDao {
	constructor(private http: HttpClient) { }
	getData(): Observable<User[]> {
		return this.http.get<User[]>('http://localhost:8765/api/users');
	}
}




// import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// import { DataSource } from '@angular/cdk/collections';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/observable/fromEvent';
// import { User } from 'app/models/user';
// import { UserService } from 'app/services/user';
// import { Headers, Http } from '@angular/http';
// import { Subscription } from 'rxjs/Subscription';

// @Component({
// 	selector: 'edit-users',
// 	styleUrls: ['../table-basic.css'],
// 	templateUrl: 'users.table.html',
// })
// export class UsersComponent implements OnInit {
// 	protected headers: Headers = new Headers({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' });
// 	public selectedUser: User;
// 	displayedColumns: Array<string> = ['id', 'name', 'eMail', 'telephone', 'role', 'street', 'housenumber', 'postalcode', 'place'];
// 	usersDatabase: UsersDatabase = new UsersDatabase(this.userService);
// 	dataSource: UsersDataSource | null;

// 	constructor(
// 		private userService: UserService,
// 		private http: Http
// 	) { }

// 	@ViewChild('filter') filter: ElementRef;

// 	ngOnInit(): void {
// 		this.dataSource = new UsersDataSource(this.usersDatabase);
// 		Observable.fromEvent(this.filter.nativeElement, 'keyup')
// 			.debounceTime(150)
// 			.distinctUntilChanged()
// 			.subscribe(() => {
// 				if (!this.dataSource) { return; }
// 				this.dataSource.filter = this.filter.nativeElement.value;
// 			});
// 	}

// 	createUser(): void {
// 		this.selectedUser = new User();
// 	}

// 	deselectUser(): void {
// 		this.selectedUser = null;
// 	}

// 	onSubmitUser(): Subscription {
// 		if (this.selectedUser.id) {
// 			return this.http.put('http://localhost:8765' + '/user/' +
// 				this.selectedUser.id,
// 				JSON.stringify(this.selectedUser)
// 				, { headers: this.headers }
// 			).subscribe(newUser => this.selectedUser = newUser.json());
// 		} else {
// 			return this.http.post('http://localhost:8765' + '/user/',
// 				JSON.stringify(this.selectedUser)
// 				, { headers: this.headers }
// 			).subscribe(newUser => this.selectedUser = newUser.json());
// 		}
// 	}

// 	selectUser(user: User): void {
// 		this.selectedUser = user;
// 	}
// }

// export class UsersDatabase {
// 	public users: User[];
// 	dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

// 	constructor(private userService: UserService) {
// 		this.users = new Array();
// 		this.userService.list().map(users => {
// 			users.forEach(user => {
// 				this.users.push(user);
// 				this.dataChange.next(this.users);
// 			});
// 		});
// 	}

// 	get data(): User[] { return this.dataChange.value; }
// }

// export class UsersDataSource extends DataSource<any> {
// 	_filterChange: BehaviorSubject<string> = new BehaviorSubject('');
// 	get filter(): string { return this._filterChange.value; }
// 	set filter(filter: string) { this._filterChange.next(filter); }

// 	constructor(private _usersDatabase: UsersDatabase) {
// 		super();
// 	}
// 	connect(): Observable<User[]> {
// 		const displayDataChanges = [
// 			this._usersDatabase.dataChange,
// 			this._filterChange,
// 		];
// 		return Observable.merge(...displayDataChanges).map(() => {
// 			return this._usersDatabase.data.slice().filter((item: User) => {
// 				const searchStr = (item.username).toLowerCase();
// 				return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
// 			});
// 		});
// 	}

// 	disconnect(): void { }
// }
