import { OnInit, AfterViewInit, ViewChild, ViewChildren, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, Sort, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { DataServiceFactory, UserService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { TableState } from 'app/models/table.state';
import { DataResponse } from 'app/models/data.response';
import { Constants } from 'app/services/constants';

export abstract class AbstractTableComponent implements OnInit, AfterViewInit {

	@ViewChildren(MatPaginator) paginator: MatPaginator;

	@ViewChild(MatSort)
	protected sort: MatSort;

	@Output() onLoadedData: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

	protected displayedColumns: Array<string>;
	protected dataSource: MatTableDataSource<any>;
	protected tableState: TableState;
	protected constants: Constants;
	protected dataService: DataService;
	protected totalCount: number;
	protected finishedLoading: boolean = false;

	constructor(dataService: DataService, constants: Constants) {
		this.dataService = dataService;
		this.constants = constants;
		this.tableState = new TableState(constants.defaultPageSize, constants.pageSizeOptions);
	}

	ngOnInit(): void {
		this.dataSource.paginator = this.paginator;
		this.initColumns();
	}

	ngAfterViewInit(): void {
		this.tableState.setSorting(this.sort.active, this.sort.start);
		this.fetchData();
	}

	initColumns(): void {
		this.displayedColumns = [];
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
		this.tableState.setSorting(event.active, event.direction);
		this.fetchData();
	}

	fetchData(): void {
		this.dataService.list(this.tableState)
			.subscribe(data => {
				this.handleResponse(data);
			});
	}

	handleResponse(response: DataResponse): void {
		this.dataSource.data = response.records;
		this.totalCount = response.totalCount;
		this.onLoadedData.emit(response.records);
		this.finishedLoading = true;
	}

	getData(): Array<any> {
		return this.dataSource.data;
	}

	onDelete(recordID: string): void {
		this.dataService
			.delete(recordID)
			.subscribe(() => this.fetchData());
	}


}
