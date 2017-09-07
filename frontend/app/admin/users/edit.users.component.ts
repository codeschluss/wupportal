import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { User } from '../../common/model/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'edit-users',
	styleUrls: ['../table-basic.css'],
	templateUrl: './edit.users.component.html'
})
export class UsersComponent implements OnInit {
	@ViewChild('filter') filter: ElementRef;

	public selectedUser: User;
	displayedColumns = ['id', 'username', 'phone', 'admin', 'fullname'];
	dataSource = this.userService.getUsersDataSource();
	public usersDatabase = this.userService.getUsersDatabase();

	constructor(
		public userService: UserService
	) { }


	ngOnInit() {
		this.dataSource = this.userService.getUsersDataSource();
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.debounceTime(150)
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
	}

	selectUser(user: User) {
		this.selectedUser = user;
	}

	createUser(): void {
		this.selectedUser = new User();
	}

	deselectUser(): void {
		this.selectedUser = null;
	}

	onSubmitUser() {
		if (this.selectedUser.id) {
			this.userService.editUser(this.selectedUser);
			this.deselectUser();
		} else {
			this.userService.postUser(this.selectedUser);
			this.dataSource = this.userService.getUsersDataSource();
			this.deselectUser();
		}

	}

	deleteUser() {
		this.userService.deleteUser(this.selectedUser);
		this.dataSource = this.userService.getUsersDataSource();
		this.deselectUser();
	}
}


