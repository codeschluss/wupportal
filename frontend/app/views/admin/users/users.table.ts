import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, Sort, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/models/user';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';


import { DataServiceFactory, UserService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { TableState } from 'app/models/table.state';
import { Response } from 'app/models/response';
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
export class UsersTableComponent extends AbstractTableComponent implements AfterViewInit {

	displayedColumns: Array<string> = ['username', 'fullname', 'phone'];
	dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	applyFilter(filterValue: string): void {
		this.tableState.setFilter(filterValue);
		this.fetchData();
	}

	constructor(
		@Inject(UserService) protected dataService: DataService,
		public constants: Constants) {
		super(dataService, constants);
	}
}
