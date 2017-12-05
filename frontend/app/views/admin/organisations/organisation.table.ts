import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { DataSource } from '@angular/cdk/table';

import { DataServiceFactory, OrganisationService } from 'app/services/data.service.factory';
import { Organisation } from 'app/models/organisation';
import { DataService } from 'app/services/data.service';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { AuthenticationService } from 'app/services/authentication.service';
import { Constants } from 'app/services/constants';
import { OrganisationDeleteComponent } from 'app/views/admin/organisations/organisation.delete';

@Component({
	selector: 'edit-organisation',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'organisation.table.html',
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient, AuthenticationService] }
	]
})

export class OrganisationsTableComponent extends AbstractTableComponent {

	displayedColumns: Array<string> = ['name', 'description', 'mail', 'phone', 'website', 'address', 'action'];
	dataSource: MatTableDataSource<Organisation> = new MatTableDataSource<Organisation>();

	constructor(
		@Inject(OrganisationService) protected dataService: DataService,
		protected constants: Constants,
		protected deleteDialog: MatDialog) {
		super(dataService, constants, deleteDialog);
	}

	handleOpeningDialog(row: any, name: string): void {
		this.openDialog(row, name, OrganisationDeleteComponent);
	}
}
