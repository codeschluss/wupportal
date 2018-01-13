import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/models/user';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { DataServiceFactory, UserService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { AuthenticationService } from 'app/services/authentication.service';
import { Constants } from 'app/services/constants';
import { Organisation } from 'app/models/organisation';

@Component({
	selector: 'edit-users',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'user.table.html',
	providers: [
		{ provide: UserService, useFactory: DataServiceFactory(UserService), deps: [HttpClient, AuthenticationService] },
	]
})
export class UserTableComponent extends AbstractTableComponent {

	displayedColumns: Array<string>;
	dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
	confirmedUserIDs: Array<number> = new Array<number>();

	@Input() organisation: Organisation;
	@Output() approvedAsAdmin: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();

	constructor(
		@Inject(UserService) protected dataService: DataService,
		protected constants: Constants,
		protected deleteDialog: MatDialog) {
		super(dataService, constants);
	}

	initColumns(): void {
		this.displayedColumns = ['username', 'fullname', 'phone', 'created', 'action'];
	}

	confirmAsAdmin(userID: number): void {
		this.confirmedUserIDs.push(userID);
		this.approvedAsAdmin.emit(this.confirmedUserIDs);
	}

	isAdmin(userID: number): boolean {
		if (this.confirmedUserIDs.indexOf(userID) === -1) {
			return false;
		} else {
			return true;
		}
	}

	removeAdmin(userId: number): void {
		const index = this.confirmedUserIDs.indexOf(userId);
		this.confirmedUserIDs.splice(index, 1);
	}
}
