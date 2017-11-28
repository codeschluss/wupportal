import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { DataSource } from '@angular/cdk/table';

import { DialogComponent } from 'app/views/common/popup.component';
import { DataServiceFactory, OrganisationService } from 'app/services/data.service.factory';
import { Organisation } from 'app/models/organisation';
import { DataService } from 'app/services/data.service';
import { Constants } from 'app/views/common/constants';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';

@Component({
	selector: 'edit-organisation',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'organisation.table.html',
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient] }
	]
})

export class OrganisationsTableComponent extends AbstractTableComponent {

	displayedColumns: Array<string> = ['name', 'description', 'mail', 'phone', 'website', 'address', 'action'];
	dataSource: MatTableDataSource<Organisation> = new MatTableDataSource<Organisation>();

	constructor(
		@Inject(OrganisationService) protected dataService: DataService,
		public constants: Constants,
		public dialog: MatDialog) {
		super(dataService, constants);
	}

	openDialog(row: Organisation): void {
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '250px',
			data: {
				name: row.name,
				message: this.constants.deleteMessage,
				id: row.id
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			// this.ngAfterViewInit();
		});
	}
}
