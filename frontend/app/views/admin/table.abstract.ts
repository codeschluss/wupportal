import { AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, Sort, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { DataServiceFactory, UserService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { TableState } from 'app/models/table.state';
import { Response } from 'app/models/response';
import { Constants } from 'app/views/common/constants';

export abstract class AbstractTableComponent implements AfterViewInit {

	@ViewChild(MatPaginator)
	protected paginator: MatPaginator;

	@ViewChild(MatSort)
	protected sort: MatSort;

	protected abstract displayedColumns: Array<string> = [];
	protected abstract dataSource: MatTableDataSource<any>;

	protected tableState: TableState;
	protected constants: Constants;
	protected dataService: DataService;

	constructor(dataService: DataService, constants: Constants) {
		this.dataService = dataService;
		this.constants = constants;
		this.tableState = new TableState(constants.defaultPageSize, constants.pageSizeOptions);
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		// this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.fetchData();
	}

	applyFilter(filterValue: string): void {
		this.tableState.setFilter(filterValue);
		this.fetchData();
	}

	changedPage(event: PageEvent): void {
		this.tableState.setPagination(event);
		this.fetchData();
	}

	fetchData(): void {
		this.dataService.list(this.tableState)
			.subscribe(data => this.handleResponse(data));
	}

	handleResponse(response: Response): void {
		this.dataSource.data = response.records;
	}
}
