import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/models/user';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { DataService } from 'app/services/data.service';
import { dataServiceFactory } from 'app/services/data.service.factory';
import { TableSate } from 'app/models/table.state';

@Component({
	selector: 'edit-users',
	styleUrls: ['../table-basic.css'],
	templateUrl: 'users.table.html',
	providers: [
		{ provide: DataService, useFactory: dataServiceFactory(User), deps: [HttpClient] }
	]
})
export class UsersTableComponent implements AfterViewInit {

	private tableState: TableState;


	displayedColumns: Array<string> = ['id', 'username', 'fullname', 'phone'];
	dataSource: MatTableDataSource = new MatTableDataSource();
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	applyFilter(filterValue: string): void {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}

	constructor(
		private dataService: DataService) {
		this.tableState = new TableSate(20);
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		// this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.fetchData();
	}

	changedPage(event: PageEvent): void {
		this.tableState.setPagination(event);
		this.fetchData();
	}

	fetchData(): void {
		this.dataService.list(this.tableState)
			.map(data => {
				return data;
			})
			.catch(() => {
				return Observable.of([]);
			})
			.subscribe(data => this.dataSource.data = data);
	}
}
