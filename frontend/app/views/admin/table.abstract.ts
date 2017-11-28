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
		this.fetchData();
	}

	handleFiltered(changedEvent: any): void {
		this.tableState.setFilter(changedEvent.target.value);
		this.fetchData();
	}

	handlePageChanged(event: PageEvent): void {
		this.tableState.setPagination(event);
		this.fetchData();
	}

	handleSorted(event: Sort): void {
		this.paginator.pageIndex = 0;
		this.tableState.setSorting(event);
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
