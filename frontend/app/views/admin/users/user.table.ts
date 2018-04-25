import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/models/user';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { DataService } from 'app/services/data.service';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { Constants } from 'app/services/constants';
import { Organisation } from 'app/models/organisation';
import { UserService } from 'app/services/user.service';

@Component({
	selector: 'edit-users',
	styleUrls: ['../table.abstract.css', '../../../app.component.css'],
	templateUrl: 'user.table.html'
})
export class UserTableComponent extends AbstractTableComponent {

	displayedColumns: Array<string>;
	dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
	confirmedUserIDs: Array<string> = new Array<string>();

	@Input() organisation: Organisation;
	@Output() approvedAsAdmin: EventEmitter<User> = new EventEmitter<User>();
	@Output() removedAsAdmin: EventEmitter<string> = new EventEmitter<string>();

	constructor(
		protected dataService: UserService,
		protected constants: Constants,
		protected deleteDialog: MatDialog) {
		super(dataService, constants);
	}

	initColumns(): void {
		this.displayedColumns = ['username', 'fullname', 'Users.phone', 'created', 'action'];
	}

	isAdmin(user: User): boolean {
		return this.confirmedUserIDs.indexOf(user.id) !== -1;
	}

	addAdmin(user: User): void {
		this.confirmedUserIDs.push(user.id);
		this.approvedAsAdmin.emit(user);
	}

	removeAdmin(user: User): void {
		const index = this.confirmedUserIDs.indexOf(user.id);
		this.confirmedUserIDs.splice(index, 1);
		this.removedAsAdmin.emit(user.id);
	}

}
