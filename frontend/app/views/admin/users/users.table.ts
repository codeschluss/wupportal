import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/models/user';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { DataServiceFactory, UserService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { Constants } from 'app/views/common/constants';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';

@Component({
	selector: 'edit-users',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'users.table.html',
	providers: [
		{ provide: UserService, useFactory: DataServiceFactory(UserService), deps: [HttpClient] },
	]
})
export class UsersTableComponent extends AbstractTableComponent {

	displayedColumns: Array<string> = ['username', 'fullname', 'phone', 'created', 'action'];
	dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

	constructor(
		@Inject(UserService) protected dataService: DataService,
		protected constants: Constants,
		protected deleteDialog: MatDialog) {
		super(dataService, constants, deleteDialog);
	}
}
