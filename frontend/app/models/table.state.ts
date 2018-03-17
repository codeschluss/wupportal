import { PageEvent, Sort } from '@angular/material';

export class TableState {

	private filter: string;
	private page: number;
	private pageSize: number;
	private sort: Sort;

	constructor(pageSize: number, pageSizeOptions: Array<number>) {
		this.filter = '';
		this.page = 1;
		this.pageSize = pageSize;
		this.sort = { active: '', direction: '' };
	}

	setPagination(pageEvent: PageEvent): void {
		this.page = pageEvent.pageIndex + 1;
		this.pageSize = pageEvent.pageSize;
	}

	setFilter(filter: string): void {
		this.filter = filter;
	}

	setSorting(active: string, direction: any): void {
		if (active && direction) {
			this.sort.active = active;
			this.sort.direction = direction;
		}
	}

}
