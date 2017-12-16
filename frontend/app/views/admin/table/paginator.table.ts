import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { Constants } from 'app/services/constants';

@Component({
	selector: 'table-paginator',
	template: `
		<mat-paginator
		[pageSize]="constants.pageSize"
    [pageSizeOptions]="constants.pageSizeOptions"
	  (page)="onHandlePageChanged($event)">
	</mat-paginator>
	`
})

export class PaginatorComponent {

	@ViewChild(MatPaginator)
	public paginator: MatPaginator;

	@Output() handlePageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

	constructor(
		public constants: Constants) { }

	onHandlePageChanged(event: PageEvent): void {
		this.handlePageChanged.emit(event);
	}

}
