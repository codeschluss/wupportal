import { PageEvent, Sort } from '@angular/material';

export class TableSate {

	private filter: string;
	private page: number;
	private pageSize: number;
	private sort: Sort;

	constructor(pageSize: number) {
		this.filter = '';
		this.page = 1;
		this.pageSize = pageSize;
	}

	setPagination(pageEvent: PageEvent): void {
		this.page = pageEvent.pageIndex + 1;
		this.pageSize = pageEvent.pageSize;
	}

	setFilter(filter: string): void {
		this.filter = filter;
	}

	setSorting(sort: Sort): void {
		this.sort = sort;
	}

}
